'use client';

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import ResumeRenderer from '@/components/ResumeRenderer';
import { ResumeData } from '@/types/resume';
import { FileText, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { templates } from '@/components/TemplateRegistry';
import { SectionEditor } from '@/components/SectionEditor';

const LANGUAGES = ['Italiano', 'English', 'Español', 'Français', 'Deutsch'];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [templateId, setTemplateId] = useState<string>('minimal');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Italiano');

  const handlePdfSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleImageSelect = (selectedFile: File) => {
    setProfileImage(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setProfileImageUrl(url);
  };

  const handleGenerateValues = async (languageOverride?: string) => {
    if (!file) return;

    // Safety check to prevent running if already analyzing
    if (isAnalyzing && !languageOverride) return;

    setIsAnalyzing(true);
    setError(null);
    // Don't clear resumeData immediately when just switching language, 
    // maybe show a "Updating..." overlay instead? 
    // For now, let's keep it simple and showing skeleton is fine.
    setResumeData(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', languageOverride || selectedLanguage);

    try {
      const response = await fetch('/api/parse-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }

      const data: ResumeData = await response.json();
      setResumeData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to process the PDF. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResumeData(null);
    setError(null);
    // Keep template and language prefs
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          LinkedIn to CV <span className="text-xs font-normal text-gray-500 ml-1 border border-gray-200 px-2 py-0.5 rounded-full">Beta V2</span>
        </h1>
        {resumeData && !isAnalyzing && (
          <button onClick={reset} className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">
            Start Over
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden">
        {/* Left Sidebar: Controls & Upload */}
        <aside className={`w-full lg:w-[400px] bg-white border-r border-gray-200 p-6 flex flex-col gap-6 overflow-y-auto z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
          ${resumeData ? 'hidden lg:flex' : 'mx-auto max-w-2xl lg:w-full lg:max-w-none lg:border-none lg:bg-transparent lg:justify-center'}`}
        >
          {/* Upload State or Edit State */}
          <div className={`flex flex-col gap-6 w-full ${!resumeData ? 'max-w-md mx-auto py-10' : ''}`}>

            {!resumeData && (
              <div className="text-center mb-2">
                <h2 className="text-3xl font-bold mb-3 text-slate-800">Transform your Profile</h2>
                <p className="text-slate-500">Upload your LinkedIn PDF to generate an ATS-friendly resume in seconds.</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    const newLang = e.target.value;
                    setSelectedLanguage(newLang);
                    // If we have a file and already generated data, we should ask to regenerate or auto-regenerate.
                    // For "magical" UX requested, we will auto-regenerate if not currently analyzing.
                    if (file && resumeData && !isAnalyzing) {
                      // Trigger regeneration with new language
                      // We need to wait for state update or pass newLang directly.
                      // Since handleGenerateValues uses selectedLanguage state, passing it as arg or using a ref is safer, 
                      // but for simplicity, we can do it via a useEffect or a wrapper.
                      // Let's make handleGenerateValues accept an optional language override.
                      requestAnimationFrame(() => handleGenerateValues(newLang));
                    }
                  }}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  disabled={isAnalyzing}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* File Uploads */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">LinkedIn PDF</label>
                <FileDropzone
                  onFileSelect={handlePdfSelect}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  label="Drop LinkedIn PDF here"
                  selectedFile={file}
                  onClear={!isAnalyzing ? () => setFile(null) : undefined}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Profile Photo <span className="font-normal text-gray-400">(Optional)</span></label>
                <FileDropzone
                  onFileSelect={handleImageSelect}
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                  label="Drop Photo"
                  icon={<ImageIcon className="w-8 h-8 text-gray-400" />}
                  selectedFile={profileImage}
                  onClear={!isAnalyzing ? () => { setProfileImage(null); setProfileImageUrl(undefined); } : undefined}
                />
              </div>

              {!resumeData && (
                <button
                  onClick={() => handleGenerateValues()}
                  disabled={!file || isAnalyzing}
                  className={`w-full py-3.5 rounded-lg font-bold text-white flex justify-center items-center gap-2 transition-all mt-4
                        ${!file || isAnalyzing ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5'}`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">Analyzing...</span>
                  ) : (
                    'Generate Resume'
                  )}
                </button>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Template Selector (Always visible unless initial empty state without data) */}
            {resumeData && (
              <div className="flex flex-col gap-6">
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">Choose Template</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTemplateId(t.id)}
                        className={`relative p-3 rounded-lg border-2 text-left transition-all group
                                    ${templateId === t.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                      >
                        <div className={`h-16 w-full rounded mb-2 ${t.thumbnail} bg-opacity-50`}></div>
                        <span className="font-bold text-sm block leading-tight text-gray-800">{t.name}</span>
                        <span className="text-[10px] text-gray-500">{t.styles}</span>
                        {templateId === t.id && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white p-0.5 rounded-full">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">Customize Content</h3>
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                    <SectionEditor data={resumeData} onUpdate={(newData) => setResumeData(newData)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Area: Preview */}
        <div className="flex-1 bg-slate-100 relative h-full overflow-hidden flex flex-col">
          {isAnalyzing ? (
            <div className="p-8 h-full overflow-hidden flex justify-center items-start pt-12">
              <SkeletonLoader />
            </div>
          ) : resumeData ? (
            <ResumeRenderer
              data={resumeData}
              templateId={templateId}
              profileImage={profileImageUrl}
              language={selectedLanguage as any}
            />
          ) : (
            // Desktop Placeholder
            <div className="hidden lg:flex h-full items-center justify-center text-gray-400 flex-col gap-4">
              <div className="w-24 h-32 border-2 border-dashed border-gray-300 rounded mx-auto"></div>
              <p>Comparison Preview</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Temporary import for error display in JSX above
import { AlertCircle } from 'lucide-react';
