import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const MinimalWeb: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white p-12 shadow-sm min-h-[297mm] text-gray-800 font-sans">
            <header className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.personal_info.fullName}</h1>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{data.personal_info.location} • {data.personal_info.email} • {data.personal_info.phone}</p>
                        <div className="flex gap-4">
                            {data.personal_info.linkedinUrl && <a href={data.personal_info.linkedinUrl} className="text-blue-600 hover:underline">LinkedIn</a>}
                            {data.personal_info.portfolioUrl && <a href={data.personal_info.portfolioUrl} className="text-blue-600 hover:underline">Portfolio</a>}
                        </div>
                    </div>
                </div>
                {profileImage && (
                    <img src={profileImage} alt="Profile" className="w-28 h-28 rounded-full object-cover border-2 border-gray-200" />
                )}
            </header>

            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.summary}</h2>
                <p className="text-sm leading-relaxed text-gray-700">{data.personal_info.summary}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.experience}</h2>
                <div className="space-y-6">
                    {data.work_experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                                <span className="text-sm text-gray-500 font-medium whitespace-nowrap ml-4">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-md italic text-gray-700">{exp.company}, {exp.location}</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1.5 leading-relaxed">
                                {exp.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.education}</h2>
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-lg text-gray-900">{edu.school}</h3>
                                <span className="text-sm text-gray-500 font-medium whitespace-nowrap ml-4">{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <p className="text-md text-gray-700">{edu.degree}, {edu.location}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-2 gap-8">
                <section>
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.skills}</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.filter(s => s.visible).map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded border border-gray-200">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.languages}</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.languages.map((lang, index) => (
                            <span key={index} className="bg-white text-gray-700 text-xs font-medium px-2.5 py-1 rounded border border-gray-300">
                                {lang}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
