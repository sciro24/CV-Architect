import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';
import { EditableField } from '../EditableField';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
    secondaryColor?: string;
    onUpdate?: (path: string, value: any) => void;
}

export const Template4Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#000000', secondaryColor = '#6b7280', onUpdate }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg p-12 font-sans">
            {/* Header */}
            <header className="flex justify-between items-start mb-12 border-b-2 pb-8" style={{ borderColor: primaryColor }}>
                <div className="flex-1">
                    <h1 className="text-5xl font-light uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                        <EditableField value={personal_info.fullName} onChange={(val) => onUpdate?.('personal_info.fullName', val)} />
                    </h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-mono">
                        {personal_info.email && <span><EditableField value={personal_info.email} onChange={(val) => onUpdate?.('personal_info.email', val)} /></span>}
                        {personal_info.phone && <span><EditableField value={personal_info.phone} onChange={(val) => onUpdate?.('personal_info.phone', val)} /></span>}
                        {personal_info.location && <span><EditableField value={personal_info.location} onChange={(val) => onUpdate?.('personal_info.location', val)} /></span>}

                    </div>
                </div>
                {profileImage && (
                    <div className="ml-8">
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-32 h-32 grayscale object-cover"
                        />
                    </div>
                )}
            </header>

            <div className="grid grid-cols-3 gap-12">
                {/* Main Column */}
                <main className="col-span-2 space-y-12">
                    {personal_info.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                About Me
                            </h2>
                            <div className="text-gray-700 leading-relaxed text-justify">
                                <EditableField value={personal_info.summary} onChange={(val) => onUpdate?.('personal_info.summary', val)} multiline className="w-full" />
                            </div>
                        </section>
                    )}

                    {work_experience && work_experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {work_experience.map((exp, index) => (
                                    <div key={index} className="relative border-l border-gray-200 pl-6 ml-1">
                                        <div className="absolute -left-1 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                                        <div className="mb-2">
                                            <h3 className="font-bold text-lg" style={{ color: primaryColor }}>
                                                <EditableField value={exp.title} onChange={(val) => onUpdate?.(`work_experience[${index}].title`, val)} />
                                            </h3>
                                            <div className="flex justify-between items-baseline text-sm mt-1">
                                                <span className="font-medium text-gray-800">
                                                    <EditableField value={exp.company} onChange={(val) => onUpdate?.(`work_experience[${index}].company`, val)} />
                                                </span>
                                                <span className="text-gray-500 font-mono">
                                                    <EditableField value={exp.startDate} onChange={(val) => onUpdate?.(`work_experience[${index}].startDate`, val)} />
                                                    {' — '}
                                                    <EditableField value={exp.endDate || ''} onChange={(val) => onUpdate?.(`work_experience[${index}].endDate`, val)} placeholder="Present" />
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside">
                                            {exp.description.map((desc, i) => (
                                                <li key={i}>
                                                    <EditableField value={desc} onChange={(val) => onUpdate?.(`work_experience[${index}].description[${i}]`, val)} multiline />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar Column */}
                <aside className="space-y-12">
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
                                Education
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="text-sm text-gray-500 font-mono mb-1">
                                            <EditableField value={edu.startDate} onChange={(val) => onUpdate?.(`education[${index}].startDate`, val)} />
                                            {' - '}
                                            <EditableField value={edu.endDate || ''} onChange={(val) => onUpdate?.(`education[${index}].endDate`, val)} placeholder="Present" />
                                        </div>
                                        <h3 className="font-bold leading-tight mb-1" style={{ color: primaryColor }}>
                                            <EditableField value={edu.school} onChange={(val) => onUpdate?.(`education[${index}].school`, val)} />
                                        </h3>
                                        <div className="text-sm text-gray-700">
                                            <EditableField value={edu.degree} onChange={(val) => onUpdate?.(`education[${index}].degree`, val)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
                                Expertise
                            </h2>
                            <ul className="space-y-2">
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <li key={index} className="text-sm text-gray-700 border-b border-gray-100 pb-1">
                                        {skill.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
                                Languages
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {languages.filter(l => l.visible).map((lang, index) => (
                                    <span key={index} className="text-sm text-white px-3 py-1 rounded-full" style={{ backgroundColor: primaryColor }}>
                                        {lang.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: primaryColor }}>
                                Certifications
                            </h2>
                            <ul className="space-y-2">
                                {data.certifications.filter(c => c.visible).map((cert, index) => (
                                    <li key={index} className="text-sm text-gray-700 border-b border-gray-100 pb-1">
                                        {cert.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};
