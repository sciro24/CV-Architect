import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import { getLanguageProficiency } from '@/utils/formatting';

interface TemplateProps {
  data: ResumeData;
  profileImage?: string;
  language: Language;
}

export const Template2Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
  const t = dictionary[language];

  return (
    <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-lg font-sans">
      {/* MAIN CONTENT (Left - 62%) */}
      <main className="w-[62%] p-[12mm] bg-white">
        <header className="mb-12">
          <h1 className="text-[32pt] font-extrabold text-[#2C3E50] leading-[0.9] tracking-[-0.02em] uppercase">
            {data.personal_info.fullName.split(' ').map((n, i) => (
              <span key={i} className="block">{n}</span>
            ))}
          </h1>
          {data.work_experience[0]?.title && (
            <p className="text-[10pt] text-[#4B5563] tracking-[0.2em] font-medium mt-4 border-t-2 border-[#2C3E50] pt-3 inline-block uppercase">
              {data.work_experience[0].title}
            </p>
          )}
        </header>

        {/* EXPERIENCE SECTION */}
        {data.work_experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[14pt] font-bold text-[#2C3E50] mb-6 tracking-widest border-b border-gray-200 pb-2 uppercase">
              {language === 'Italiano' ? 'Esperienza' : 'Experience'}
            </h2>
            <div className="space-y-8">
              {data.work_experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[#2C3E50] text-[11pt] uppercase">{exp.title}</h3>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10pt] text-[#4B5563] font-semibold">{exp.company}</span>
                    <span className="text-[9pt] text-gray-500 italic">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[9pt] text-[#4B5563] space-y-1.5 leading-[1.5]">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="pl-1">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION SECTION */}
        {data.education.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[14pt] font-bold text-[#2C3E50] mb-6 tracking-widest border-b border-gray-200 pb-2 uppercase">
              {language === 'Italiano' ? 'Istruzione' : 'Education'}
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[#2C3E50] text-[10pt] uppercase">{edu.school}</h3>
                    <span className="text-[9pt] text-gray-500 italic">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-[9pt] text-[#4B5563] mt-1">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS SECTION (Main column for better space usage) */}
        {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
          <section>
            <h2 className="text-[14pt] font-bold text-[#2C3E50] mb-6 tracking-widest border-b border-gray-200 pb-2 uppercase">
              {language === 'Italiano' ? 'Certificazioni' : 'Certifications'}
            </h2>
            <ul className="space-y-2 text-[9pt] text-[#4B5563] leading-relaxed">
              {data.certifications.filter(c => c.visible).map((cert, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-[#2C3E50]">•</span>
                  {cert.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {/* SIDEBAR (Right - 38%) */}
      <aside className="w-[38%] bg-[#2C3E50] text-white p-[10mm] flex flex-col min-h-full">
        {/* PHOTO */}
        {profileImage && (
          <div className="w-full aspect-square mb-10 overflow-hidden rounded-none border-[4pt] border-white/10 shadow-lg">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}

        {/* ABOUT ME */}
        {data.personal_info.summary && (
          <div className="mb-10">
            <h3 className="text-[11pt] font-bold text-white mb-4 uppercase tracking-[0.1em] border-b border-white/20 pb-2">
              {language === 'Italiano' ? 'Profilo' : 'Profile'}
            </h3>
            <p className="text-[9pt] text-gray-300 leading-[1.6] text-justify">
              {data.personal_info.summary}
            </p>
          </div>
        )}

        {/* CONTACT */}
        <div className="mb-10">
          <h3 className="text-[11pt] font-bold text-white mb-4 uppercase tracking-[0.1em] border-b border-white/20 pb-2">
            Contact
          </h3>
          <div className="space-y-4 text-[9pt]">
            {data.personal_info.phone && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded">
                  <Phone size={14} className="text-white" />
                </div>
                <span className="text-gray-200">{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info.email && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded">
                  <Mail size={14} className="text-white" />
                </div>
                <span className="text-gray-200 break-all">{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info.location && (
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-white/10 rounded shrink-0">
                  <MapPin size={14} className="text-white" />
                </div>
                <span className="text-gray-200">{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info.portfolioUrl && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded">
                  <Globe size={14} className="text-white" />
                </div>
                <a href={data.personal_info.portfolioUrl} target="_blank" rel="noreferrer" className="text-gray-200 underline decoration-white/30 underline-offset-2 break-all">
                  {data.personal_info.portfolioUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* SKILLS */}
        {/* Using simple list or pills as per Patterson often uses */}
        {data.skills.filter(s => s.visible).length > 0 && (
          <div className="mb-10">
            <h3 className="text-[11pt] font-bold text-white mb-4 uppercase tracking-[0.1em] border-b border-white/20 pb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.filter(s => s.visible).map((skill, i) => (
                <div key={i} className="bg-white/10 px-3 py-1.5 rounded text-[9pt] text-gray-200 font-medium">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {data.languages.length > 0 && (
          <div className="mb-10">
            <h3 className="text-[11pt] font-bold text-white mb-6 uppercase tracking-[0.1em] border-b border-white/20 pb-2">
              {language === 'Italiano' ? 'Lingue' : 'Languages'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.languages.slice(0, 4).map((lang, i) => {
                const { percentage, name } = getLanguageProficiency(lang);
                // Calculate dash array for Svg circle
                // r = 24
                const radius = 24;
                const circumference = 2 * Math.PI * radius;
                const dashArray = `${circumference * (percentage / 100)} ${circumference}`;

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-[56px] h-[56px] mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        {/* Track */}
                        <circle cx="28" cy="28" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                        {/* Progress */}
                        <circle
                          cx="28" cy="28" r={radius}
                          stroke="white" strokeWidth="3" fill="none"
                          strokeDasharray={dashArray}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9pt] font-bold text-white">{percentage}%</span>
                      </div>
                    </div>
                    <span className="text-[9pt] text-gray-200 text-center font-medium leading-tight">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
