import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const ModernWeb: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-sm font-sans">
            {/* Sidebar */}
            <aside className="w-[32%] bg-[#1a202c] text-white p-8 flex flex-col min-h-[297mm]">
                <div className="flex flex-col items-center mb-10">
                    {profileImage && (
                        <img src={profileImage} alt="Profile" className="w-36 h-36 rounded-full object-cover border-[3px] border-gray-600 mb-5 shadow-lg" />
                    )}
                    <h1 className="text-2xl font-bold text-center leading-tight mb-2 tracking-wide">{data.personal_info.fullName}</h1>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{data.personal_info.location}</p>
                </div>

                <div className="space-y-8 flex-1">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 border-b border-gray-700 pb-2 mb-4">{t.contact}</h3>
                        <div className="space-y-3 text-sm text-gray-300 break-words font-light">
                            <p className="flex items-center gap-2">{data.personal_info.email}</p>
                            <p>{data.personal_info.phone}</p>
                            {data.personal_info.linkedinUrl && <a href={data.personal_info.linkedinUrl} className="block text-blue-400 hover:text-blue-300 truncate transition-colors">LinkedIn</a>}
                            {data.personal_info.portfolioUrl && <a href={data.personal_info.portfolioUrl} className="block text-blue-400 hover:text-blue-300 truncate transition-colors">Portfolio</a>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 border-b border-gray-700 pb-2 mb-4">{t.skills}</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span key={index} className="bg-gray-800 text-gray-200 text-xs px-2.5 py-1 rounded leading-none border border-gray-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 border-b border-gray-700 pb-2 mb-4">{t.languages}</h3>
                        <div className="space-y-1.5 text-sm text-gray-300 font-light">
                            {data.languages.map((lang, index) => (
                                <p key={index}>{lang}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 border-b border-gray-700 pb-2 mb-4">{t.education}</h3>
                        <div className="space-y-5 text-sm">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <p className="font-bold text-white mb-0.5">{edu.school}</p>
                                    <p className="text-gray-400 italic mb-1">{edu.degree}</p>
                                    <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 bg-white">
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-2 border-b-2 border-blue-500 inline-block uppercase tracking-tight">{t.summary}</h2>
                    <p className="text-gray-600 leading-relaxed text-[0.92rem]">
                        {data.personal_info.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block uppercase tracking-tight">{t.experience}</h2>
                    <div className="space-y-8">
                        {data.work_experience.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-[3px] border-gray-200">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-500"></div>
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{exp.title}</h3>
                                    <div className="flex flex-wrap justify-between text-sm text-gray-500 mt-1 items-baseline">
                                        <span className="font-semibold text-blue-700 text-[0.95rem]">{exp.company}</span>
                                        <span className="italic">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">{exp.location}</p>
                                </div>
                                <ul className="mt-3 list-disc list-outside ml-4 text-[0.9rem] text-gray-600 space-y-1.5 marker:text-gray-400">
                                    {exp.description.map((desc, i) => (
                                        <li key={i} className="pl-1">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
