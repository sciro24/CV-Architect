import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, MapPin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template3Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-sans flex flex-col">
            {/* Header Section */}
            <header className="bg-[#B8D4E8] h-48 relative">
                <div className="absolute top-0 right-0 w-[70%] h-full flex flex-col justify-center px-10">
                    <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-widest mb-2">
                        {data.personal_info.fullName}
                    </h1>
                    {data.work_experience[0]?.title && (
                        <p className="text-xl text-gray-700 tracking-wider">{data.work_experience[0].title}</p>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <aside className="w-[30%] bg-[#C5D9E6] px-6 pb-8 pt-20 relative">
                    {/* Profile Image - Overlapping Header and Sidebar */}
                    {profileImage && (
                        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover border-[6px] border-white shadow-md"
                            />
                        </div>
                    )}

                    {/* Contact */}
                    <div className="mb-8 space-y-4 pt-4">
                        {data.personal_info.phone && (
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1.5 rounded-full">
                                    <Phone size={10} className="text-gray-700" />
                                </div>
                                <span className="text-xs text-gray-700 font-medium">{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info.email && (
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1.5 rounded-full">
                                    <Mail size={10} className="text-gray-700" />
                                </div>
                                <span className="text-xs text-gray-700 font-medium break-all">{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info.location && (
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1.5 rounded-full">
                                    <MapPin size={10} className="text-gray-700" />
                                </div>
                                <span className="text-xs text-gray-700 font-medium">{data.personal_info.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    {data.education.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b border-gray-400 pb-1">Education</h3>
                            <div className="space-y-4">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="text-xs font-bold text-gray-800 uppercase">{edu.degree}</p>
                                        <p className="text-xs text-gray-700">{edu.school}</p>
                                        <p className="text-[10px] text-gray-600 mt-1">{edu.startDate} - {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {data.skills.filter(s => s.visible).length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b border-gray-400 pb-1">Skills</h3>
                            <ul className="space-y-2 text-xs text-gray-700">
                                {data.skills.filter(s => s.visible).map((skill, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                        <span className="font-medium">{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Language */}
                    {data.languages.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b border-gray-400 pb-1">Language</h3>
                            <ul className="space-y-2 text-xs text-gray-700">
                                {data.languages.map((lang, i) => (
                                    <li key={i} className="font-medium">{lang}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10 pt-8">
                    {/* About Me */}
                    {data.personal_info.summary && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-widest">About Me</h2>
                            <div className="h-1 w-12 bg-gray-800 mb-4"></div>
                            <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                {data.personal_info.summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {data.work_experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-widest">Work Experience</h2>
                            <div className="h-1 w-12 bg-gray-800 mb-6"></div>
                            <div className="space-y-8">
                                {data.work_experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex flex-col mb-2">
                                            <h3 className="font-bold text-gray-900 text-base uppercase">{exp.title}</h3>
                                            <p className="text-sm text-gray-600 font-semibold">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                                        </div>
                                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-1.5 leading-relaxed marker:text-gray-400">
                                            {exp.description.map((desc, idx) => (
                                                <li key={idx}>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-widest">Certifications</h2>
                            <div className="h-1 w-12 bg-gray-800 mb-6"></div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                {data.certifications.filter(c => c.visible).map((cert, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-gray-400 mt-1">•</span>
                                        <span>{cert.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};
