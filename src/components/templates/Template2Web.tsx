import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  profileImage?: string;
  language: Language;
}

export const Template2Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
  const t = dictionary[language];

  return (
    <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-lg font-sans">
      <main className="flex-1 p-10 bg-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2C3E50] uppercase tracking-wide mb-1">
            {data.personal_info.fullName}
          </h1>
          {data.work_experience[0]?.title && (
            <p className="text-base text-gray-700 font-light">{data.work_experience[0].title}</p>
          )}
        </div>

        {data.work_experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">Experience</h2>
            <div className="space-y-5">
              {data.work_experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 leading-relaxed">
                    {exp.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{edu.school}</h3>
                    <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-gray-600">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">Certifications</h2>
            <ul className="space-y-2 text-xs text-gray-600">
              {data.certifications.filter(c => c.visible).map((cert, i) => (
                <li key={i}>• {cert.name}</li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <aside className="w-[38%] bg-[#2C3E50] text-white p-8 flex flex-col">
        {profileImage && (
          <div className="mb-6 -mt-4">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-40 h-40 rounded-full object-cover border-4 border-white mx-auto"
            />
          </div>
        )}

        {data.personal_info.summary && (
          <div className="bg-[#1a252f] rounded-2xl p-6 mb-6">
            <h3 className="text-base font-bold mb-3 uppercase tracking-wide">About Me</h3>
            <p className="text-xs leading-relaxed text-gray-300">{data.personal_info.summary}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-base font-bold mb-4 uppercase tracking-wide">Contact</h3>
          <div className="space-y-3 text-xs">
            {data.personal_info.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span className="break-all">{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info.portfolioUrl && (
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span className="break-all">{data.personal_info.portfolioUrl}</span>
              </div>
            )}
          </div>
        </div>

        {data.skills.filter(s => s.visible).length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-4 uppercase tracking-wide">Skills</h3>
            <ul className="space-y-2 text-xs">
              {data.skills.filter(s => s.visible).map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.languages.length > 0 && (
          <div>
            <h3 className="text-base font-bold mb-4 uppercase tracking-wide">Language</h3>
            <div className="flex gap-4 justify-center">
              {data.languages.slice(0, 3).map((lang, i) => (
                <div key={i} className="text-center">
                  <div className="relative w-16 h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                      <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="4" fill="none" strokeDasharray={`${28 * 2 * Math.PI * 0.85} ${28 * 2 * Math.PI}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold">85%</span>
                    </div>
                  </div>
                  <p className="text-xs">{lang}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
