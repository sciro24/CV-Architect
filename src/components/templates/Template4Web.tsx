import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template4Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-sans flex">
            {/* Left Sidebar - Light Gray */}
            <aside className="w-[35%] bg-[#F3F4F6] p-8 pt-60 relative">
                {/* Profile Image - Overlapping Header and Sidebar? No, user said overlapping black/white. 
            If header is on right, maybe photo is on right too? 
            Let's assume photo is on the left of the CONTENT column, overlapping the header bottom.
            Actually, let's put the photo in the sidebar column but absolutely positioned to overlap? 
            No, let's put it in the main column.
        */}

                {/* About Me */}
                {data.personal_info.summary && (
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b-2 border-gray-300 pb-1 w-[20px]">Profile</h3>
                        <p className="text-xs text-gray-600 leading-relaxed text-justify mt-4">
                            {data.personal_info.summary}
                        </p>
                    </div>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b-2 border-gray-300 pb-1 w-[20px]">Education</h3>
                        <div className="space-y-6 mt-4">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="text-xs font-bold text-gray-800 uppercase">{edu.degree}</p>
                                    <p className="text-xs text-gray-600 mt-1">{edu.school}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills with Progress Bars */}
                {data.skills.filter(s => s.visible).length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b-2 border-gray-300 pb-1 w-[20px]">Skills</h3>
                        <div className="space-y-4 mt-4">
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-xs font-semibold text-gray-700">{skill.name}</p>
                                    </div>
                                    <div className="w-full bg-gray-300 h-1 rounded-full overflow-hidden">
                                        <div className="bg-gray-800 h-full rounded-full" style={{ width: `${Math.floor(Math.random() * (100 - 70) + 70)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Language */}
                {data.languages.length > 0 && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest border-b-2 border-gray-300 pb-1 w-[20px]">Language</h3>
                        <ul className="space-y-2 text-xs text-gray-700 mt-4">
                            {data.languages.map((lang, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                                    <span className="font-semibold">{lang}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Main Content - Right Side */}
            <main className="flex-1 bg-white relative">
                {/* Black Header Block */}
                <div className="bg-[#1F2937] h-52 w-full p-10 flex flex-col justify-center relative">
                    <h1 className="text-4xl font-bold text-white uppercase tracking-widest mb-2 z-10">
                        {data.personal_info.fullName}
                    </h1>
                    {data.work_experience[0]?.title && (
                        <p className="text-sm text-gray-300 uppercase tracking-widest z-10">{data.work_experience[0].title}</p>
                    )}

                    {/* Profile Image - Overlapping Bottom Edge of Header */}
                    {profileImage && (
                        <div className="absolute -bottom-16 left-10 z-20">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover border-[8px] border-white shadow-lg"
                            />
                        </div>
                    )}
                </div>

                <div className="p-10 pt-24">
                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                        {data.personal_info.phone && (
                            <div className="flex items-center gap-3">
                                <div className="bg-[#F3F4F6] p-2 rounded-full">
                                    <Phone size={14} className="text-gray-800" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Phone</p>
                                    <p className="text-xs text-gray-800 font-semibold">{data.personal_info.phone}</p>
                                </div>
                            </div>
                        )}
                        {data.personal_info.email && (
                            <div className="flex items-center gap-3">
                                <div className="bg-[#F3F4F6] p-2 rounded-full">
                                    <Mail size={14} className="text-gray-800" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Email</p>
                                    <p className="text-xs text-gray-800 font-semibold break-all">{data.personal_info.email}</p>
                                </div>
                            </div>
                        )}
                        {data.personal_info.portfolioUrl && (
                            <div className="flex items-center gap-3">
                                <div className="bg-[#F3F4F6] p-2 rounded-full">
                                    <Globe size={14} className="text-gray-800" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Website</p>
                                    <p className="text-xs text-gray-800 font-semibold break-all">{data.personal_info.portfolioUrl}</p>
                                </div>
                            </div>
                        )}
                        {data.personal_info.location && (
                            <div className="flex items-center gap-3">
                                <div className="bg-[#F3F4F6] p-2 rounded-full">
                                    <MapPin size={14} className="text-gray-800" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Address</p>
                                    <p className="text-xs text-gray-800 font-semibold">{data.personal_info.location}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Experience */}
                    {data.work_experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-lg font-bold text-gray-800 mb-8 uppercase tracking-widest border-b-2 border-gray-200 pb-2">Experience</h2>
                            <div className="space-y-0 relative border-l-2 border-gray-200 ml-3">
                                {data.work_experience.map((exp, i) => (
                                    <div key={i} className="relative pl-8 pb-10 last:pb-0">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white bg-gray-800 shadow-sm"></div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                            <h3 className="font-bold text-gray-900 text-sm uppercase">{exp.title}</h3>
                                            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-bold text-gray-600">{exp.company}</span>
                                            <span className="text-gray-300 text-xs">|</span>
                                            <span className="text-xs text-gray-500 italic">{exp.location}</span>
                                        </div>

                                        <ul className="text-xs text-gray-600 leading-relaxed space-y-1">
                                            {exp.description.map((desc, idx) => (
                                                <li key={idx} className="pl-0">{desc}</li>
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
                            <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-widest border-b-2 border-gray-200 pb-2">Certifications</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {data.certifications.filter(c => c.visible).map((cert, i) => (
                                    <div key={i} className="bg-gray-50 p-3 rounded border border-gray-100">
                                        <p className="text-xs font-semibold text-gray-700">{cert.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};
