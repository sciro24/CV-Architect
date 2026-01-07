import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template4Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-sm min-h-[297mm] font-sans text-sm">
            <header className="bg-gray-800 text-white p-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.personal_info.fullName}</h1>
                    <div className="text-gray-300 text-xs flex gap-3">
                        <span>{data.personal_info.email}</span>
                        <span>|</span>
                        <span>{data.personal_info.phone}</span>
                        <span>|</span>
                        <span>{data.personal_info.location}</span>
                    </div>
                </div>
                {profileImage && <img src={profileImage} className="w-20 h-20 rounded-lg object-cover ml-6" />}
            </header>

            <div className="p-8">
                <p className="text-gray-600 mb-8 leading-relaxed text-xs">{data.personal_info.summary}</p>

                <div className="flex gap-8">
                    <div className="w-2/3">
                        <h2 className="text-gray-800 font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-xs">{t.experience}</h2>
                        <div className="space-y-6">
                            {data.work_experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                        <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 italic mb-2">{exp.company}</p>
                                    <ul className="list-disc ml-4 text-xs text-gray-500 space-y-1">
                                        {exp.description.map((d, idx) => <li key={idx}>{d}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-1/3">
                        <h2 className="text-gray-800 font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-xs">{t.education}</h2>
                        <div className="space-y-4 mb-8">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-bold text-gray-900 text-xs">{edu.school}</p>
                                    <p className="text-xs text-gray-600">{edu.degree}</p>
                                    <p className="text-[10px] text-gray-400">{edu.endDate}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-gray-800 font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-xs">{t.skills}</h2>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[10px]">{skill.name}</span>
                            ))}
                        </div>

                        <h2 className="text-gray-800 font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-xs">{t.languages}</h2>
                        <div className="space-y-1">
                            {data.languages.map((l, i) => (
                                <p key={i} className="text-xs text-gray-600">{l}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
