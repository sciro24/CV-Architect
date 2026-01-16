import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';
import { EditableField } from '../EditableField';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
    onUpdate?: (path: string, value: any) => void;
}

export const Template1Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#1E293B', onUpdate }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-lg font-sans text-sm">
            <aside className="w-[30%] text-white p-6 flex flex-col gap-6" style={{ backgroundColor: primaryColor }}>
                <div className="text-center">
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/20"
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <section>
                        <h3 className="uppercase tracking-widest text-white/70 text-xs font-bold mb-3 border-b border-white/20 pb-1">
                            Contact
                        </h3>
                        <div className="space-y-3 text-sm text-white/90">
                            {personal_info.email && (
                                <div className="break-all flex items-start gap-2">
                                    <Mail size={12} className="mt-1 flex-shrink-0" />
                                    <EditableField
                                        value={personal_info.email}
                                        onChange={(val) => onUpdate?.('personal_info.email', val)}
                                        className="text-white/90"
                                    />
                                </div>
                            )}
                            {personal_info.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="flex-shrink-0" />
                                    <EditableField
                                        value={personal_info.phone}
                                        onChange={(val) => onUpdate?.('personal_info.phone', val)}
                                    />
                                </div>
                            )}
                            {personal_info.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} className="flex-shrink-0" />
                                    <EditableField
                                        value={personal_info.location}
                                        onChange={(val) => onUpdate?.('personal_info.location', val)}
                                    />
                                </div>
                            )}

                        </div>
                    </section>

                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="uppercase tracking-widest text-white/70 text-xs font-bold mb-3 border-b border-white/20 pb-1">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-white/90 text-xs font-medium border-b border-white/20 pb-0.5"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h3 className="uppercase tracking-widest text-white/70 text-xs font-bold mb-3 border-b border-white/20 pb-1">
                                Languages
                            </h3>
                            <ul className="space-y-1 text-white/90">
                                {languages.filter(l => l.visible).map((lang, index) => (
                                    <li key={index}>• {lang.name}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </aside>

            <main className="flex-1 p-8 text-slate-800">
                <header className="mb-8 border-b-2 border-slate-100 pb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: primaryColor }}>
                        <EditableField
                            value={personal_info.fullName}
                            onChange={(val) => onUpdate?.('personal_info.fullName', val)}
                        />
                    </h1>
                    {personal_info.summary && (
                        <div className="mt-4 text-slate-600 leading-relaxed">
                            <EditableField
                                value={personal_info.summary}
                                onChange={(val) => onUpdate?.('personal_info.summary', val)}
                                multiline
                                className="w-full"
                            />
                        </div>
                    )}
                </header>

                <div className="space-y-8">
                    {work_experience && work_experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider" style={{ color: primaryColor }}>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {work_experience.filter(exp => exp.visible !== false).map((exp, index) => (
                                    <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg text-slate-900">
                                                <EditableField
                                                    value={exp.title}
                                                    onChange={(val) => onUpdate?.(`work_experience[${index}].title`, val)}
                                                />
                                            </h3>
                                            <span className="text-sm text-slate-500 font-medium whitespace-nowrap ml-4">
                                                <EditableField value={exp.startDate} onChange={(val) => onUpdate?.(`work_experience[${index}].startDate`, val)} />
                                                {' - '}
                                                <EditableField value={exp.endDate || ''} onChange={(val) => onUpdate?.(`work_experience[${index}].endDate`, val)} placeholder="Present" />
                                            </span>
                                        </div>
                                        <div className="font-medium mb-2" style={{ color: primaryColor }}>
                                            <EditableField value={exp.company} onChange={(val) => onUpdate?.(`work_experience[${index}].company`, val)} />
                                        </div>
                                        <ul className="list-disc list-inside text-slate-600 leading-relaxed text-sm">
                                            {exp.description.map((desc, i) => (
                                                <li key={i}>
                                                    <EditableField
                                                        value={desc}
                                                        onChange={(val) => onUpdate?.(`work_experience[${index}].description[${i}]`, val)}
                                                        multiline
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider" style={{ color: primaryColor }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {education.filter(edu => edu.visible !== false).map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-lg text-slate-900">
                                                <EditableField value={edu.school} onChange={(val) => onUpdate?.(`education[${index}].school`, val)} />
                                            </h3>
                                            <span className="text-sm text-slate-500 font-medium">
                                                <EditableField value={edu.startDate} onChange={(val) => onUpdate?.(`education[${index}].startDate`, val)} />
                                                {' - '}
                                                <EditableField value={edu.endDate || ''} onChange={(val) => onUpdate?.(`education[${index}].endDate`, val)} placeholder="Present" />
                                            </span>
                                        </div>
                                        <div className="text-slate-700">
                                            <EditableField value={edu.degree} onChange={(val) => onUpdate?.(`education[${index}].degree`, val)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider" style={{ color: primaryColor }}>
                                Certifications
                            </h2>
                            <ul className="list-disc list-inside text-slate-700 space-y-1">
                                {data.certifications.filter(c => c.visible).map((cert, index) => (
                                    <li key={index}>{cert.name}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};
