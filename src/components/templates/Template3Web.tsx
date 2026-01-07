import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template3Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-sm min-h-[297mm] text-gray-800 font-sans text-sm">
            <div className="flex items-center border-b border-blue-200 pb-6 mb-6">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-blue-900 uppercase tracking-tight">{data.personal_info.fullName}</h1>
                    <p className="text-blue-600 font-medium mb-1">{data.personal_info.location}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>{data.personal_info.email}</span>
                        <span>{data.personal_info.phone}</span>
                        {data.personal_info.linkedinUrl && <a href={data.personal_info.linkedinUrl} className="text-blue-500 hover:underline">LinkedIn</a>}
                    </div>
                </div>
                {profileImage && <img src={profileImage} className="w-20 h-20 rounded-full object-cover ml-4 border-2 border-blue-100" />}
            </div>

            <div className="mb-6">
                <h2 className="text-blue-800 font-bold uppercase text-xs tracking-wider border-b border-gray-100 pb-1 mb-2">{t.summary}</h2>
                <p className="text-gray-600 leading-relaxed text-xs">{data.personal_info.summary}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-blue-800 font-bold uppercase text-xs tracking-wider border-b border-gray-100 pb-1 mb-3">{t.experience}</h2>
                <div className="space-y-4">
                    {data.work_experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-gray-900 text-sm">{exp.title}</h3>
                                <span className="text-xs text-gray-500 italic">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="text-xs text-gray-600 italic mb-1">{exp.company}, {exp.location}</p>
                            <ul className="list-disc list-outside ml-3 text-xs text-gray-500 space-y-0.5">
                                {exp.description.map((d, idx) => <li key={idx}>{d}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-blue-800 font-bold uppercase text-xs tracking-wider border-b border-gray-100 pb-1 mb-3">{t.education}</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between text-xs">
                                <span className="font-bold text-gray-900">{edu.school}</span>
                                <span className="text-gray-400">{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <p className="text-xs text-gray-600">{edu.degree}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-blue-800 font-bold uppercase text-xs tracking-wider border-b border-gray-100 pb-1 mb-3">{t.skills}</h2>
                    <div className="flex flex-wrap gap-1.5">
                        {data.skills.filter(s => s.visible).map((skill, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{skill.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
