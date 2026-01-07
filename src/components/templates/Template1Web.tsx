import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { getLanguageProficiency } from '@/utils/formatting';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template1Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-lg font-sans">
            {/* Left Sidebar - Dark Gray */}
            <aside className="w-[35%] bg-[#4A5568] text-white p-8 flex flex-col">
                {/* Profile Photo */}
                {profileImage && (
                    <div className="mb-6">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white/20 mx-auto"
                        />
                    </div>
                )}

                {/* Name & Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">{data.personal_info.fullName}</h1>
                    {data.work_experience[0]?.title && (
                        <p className="text-sm text-gray-300 font-light">{data.work_experience[0].title}</p>
                    )}
                </div>

                {/* Contact */}
                <div className="mb-8 space-y-3 text-sm">
                    {data.personal_info.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="flex-shrink-0" />
                            <span className="text-xs">{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="flex-shrink-0" />
                            <span className="text-xs break-all">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="flex-shrink-0" />
                            <span className="text-xs">{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info.portfolioUrl && (
                        <div className="flex items-center gap-2">
                            <Globe size={14} className="flex-shrink-0" />
                            <span className="text-xs break-all">{data.personal_info.portfolioUrl}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {data.skills.filter(s => s.visible).length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Skills</h3>
                        <ul className="space-y-2 text-sm">
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                    <span className="text-xs">{skill.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Language */}
                {data.languages.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Language</h3>
                        <div className="space-y-3">
                            {data.languages.map((lang, i) => {
                                const { percentage, name } = getLanguageProficiency(lang);
                                return (
                                    <div key={i}>
                                        <p className="text-xs mb-1">{name}</p>
                                        <div className="w-full bg-white/20 h-1.5 rounded-full">
                                            <div className="bg-white h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </aside>

            {/* Right Main Content */}
            <main className="flex-1 p-10 bg-white">
                {/* About Me */}
                {data.personal_info.summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300 uppercase tracking-wide">About Me</h2>
                        <p className="text-sm text-gray-600 leading-relaxed text-justify">
                            {data.personal_info.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.work_experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide">Experience</h2>
                        <div className="space-y-5">
                            {data.work_experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic mb-2">{exp.company} - {exp.location}</p>
                                    <ul className="text-xs text-gray-600 space-y-1 leading-relaxed">
                                        {exp.description.map((desc, idx) => (
                                            <li key={idx}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide">Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-gray-900 text-sm">{edu.school}</h3>
                                    <p className="text-xs text-gray-600">{edu.degree}</p>
                                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide">Certifications</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {data.certifications.filter(c => c.visible).map((cert, i) => (
                                <li key={i}>• {cert.name}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};
