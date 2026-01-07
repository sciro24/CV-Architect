import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Circle } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { getLanguageProficiency } from '@/utils/formatting';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 0
    },
    main: {
        width: '62%',
        padding: 35, // '35pt' interpreted as number roughly
        paddingTop: 50
    },
    sidebar: {
        width: '38%',
        backgroundColor: '#2C3E50',
        color: '#FFFFFF',
        padding: 25,
        minHeight: '100%'
    },

    // Header
    header: { marginBottom: 40 },
    nameBlock: { marginBottom: 8 },
    name: {
        fontSize: 30,
        fontFamily: 'Helvetica-Bold',
        lineHeight: 1.0, // Tighter leading for stacked name
        color: '#2C3E50',
        textTransform: 'uppercase'
    },
    jobTitle: {
        fontSize: 10,
        color: '#4B5563',
        textTransform: 'uppercase',
        letterSpacing: 2,
        borderTopWidth: 1.5,
        borderTopColor: '#2C3E50',
        paddingTop: 8,
        alignSelf: 'flex-start'
    },

    // Main Sections
    section: { marginBottom: 30 },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#2C3E50',
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 4
    },

    // Experience Items
    expItem: { marginBottom: 15 },
    expTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#2C3E50', textTransform: 'uppercase', marginBottom: 2 },
    expCompany: { fontSize: 10, color: '#4B5563', fontFamily: 'Helvetica-Bold' },
    expDate: { fontSize: 9, color: '#6B7280', fontStyle: 'italic' },
    expDesc: { fontSize: 9, color: '#4B5563', lineHeight: 1.4, textAlign: 'justify' }, // Line Height 1.4

    // Education
    eduItem: { marginBottom: 12 },
    eduDegree: { fontSize: 9, color: '#4B5563', marginTop: 2 },

    // Sidebar Elements
    photoContainer: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 30,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden'
    },
    profileImage: { width: '100%', height: '100%', objectFit: 'cover' },

    sidebarSection: { marginBottom: 30 },
    sidebarTitle: {
        fontSize: 12, // User requested 12
        fontFamily: 'Helvetica-Bold',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        paddingBottom: 5,
        marginBottom: 15
    },
    aboutText: { fontSize: 9, color: '#E5E7EB', lineHeight: 1.5, textAlign: 'justify' },

    // Contact
    contactItem: { marginBottom: 10 },
    contactLabel: { fontSize: 8, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 2 },
    contactValue: { fontSize: 9, color: '#FFFFFF', fontFamily: 'Helvetica' },

    // Skills
    skillPill: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 2
    },
    skillText: { fontSize: 8, color: '#E5E7EB', fontFamily: 'Helvetica' },

    // Languages
    langGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
    langItem: { alignItems: 'center', width: '45%', marginBottom: 10 },
    langName: { fontSize: 8, color: '#E5E7EB', marginTop: 4, textAlign: 'center' }
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template2Pdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    // Recalculate styles inside component if we want purely dynamic, but StyleSheet is usually better outside.
    // However, the user provided new styles. I will overwrite the `styles` define AND the component returning block.

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* MAIN CONTENT (62%) */}
                <View style={styles.main}>
                    <View style={styles.header}>
                        <View style={styles.nameBlock}>
                            {data.personal_info.fullName.split(' ').map((n, i) => (
                                <Text key={i} style={styles.name}>{n}</Text>
                            ))}
                        </View>
                        {data.work_experience[0]?.title && (
                            <Text style={styles.jobTitle}>{data.work_experience[0].title}</Text>
                        )}
                    </View>

                    {/* EXPERIENCE */}
                    {data.work_experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{language === 'Italiano' ? 'Esperienza' : 'Experience'}</Text>
                            {data.work_experience.map((exp, i) => (
                                <View key={i} style={styles.expItem}>
                                    <Text style={styles.expTitle}>{exp.title}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <Text style={styles.expCompany}>{exp.company}</Text>
                                        <Text style={styles.expDate}>{exp.startDate} – {exp.endDate}</Text>
                                    </View>
                                    {exp.description.map((desc, idx) => (
                                        <View key={idx} style={{ flexDirection: 'row', marginBottom: 2 }}>
                                            <Text style={{ fontSize: 10, marginRight: 4, color: '#4B5563' }}>•</Text>
                                            <Text style={styles.expDesc}>{desc}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* EDUCATION */}
                    {data.education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{language === 'Italiano' ? 'Istruzione' : 'Education'}</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={styles.eduItem}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <Text style={styles.expTitle}>{edu.school}</Text>
                                        <Text style={styles.expDate}>{edu.startDate} – {edu.endDate}</Text>
                                    </View>
                                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* CERTIFICATIONS */}
                    {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{language === 'Italiano' ? 'Certificazioni' : 'Certifications'}</Text>
                            {data.certifications.filter(c => c.visible).map((cert, i) => (
                                <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                                    <Text style={{ fontSize: 10, marginRight: 4, color: '#2C3E50' }}>•</Text>
                                    <Text style={{ fontSize: 9, color: '#4B5563', lineHeight: 1.4, flex: 1 }}>{cert.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* SIDEBAR (38%) */}
                <View style={styles.sidebar}>
                    {/* PHOTO */}
                    {profileImage && (
                        <View style={styles.photoContainer}>
                            <Image src={profileImage} style={styles.profileImage} />
                        </View>
                    )}

                    {/* ABOUT ME */}
                    {data.personal_info.summary && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>{language === 'Italiano' ? 'Profilo' : 'Profile'}</Text>
                            <Text style={styles.aboutText}>{data.personal_info.summary}</Text>
                        </View>
                    )}

                    {/* CONTACT */}
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Contact</Text>
                        {data.personal_info.phone && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Phone</Text>
                                <Text style={styles.contactValue}>{data.personal_info.phone}</Text>
                            </View>
                        )}
                        {data.personal_info.email && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Email</Text>
                                <Text style={styles.contactValue}>{data.personal_info.email}</Text>
                            </View>
                        )}
                        {data.personal_info.location && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Address</Text>
                                <Text style={styles.contactValue}>{data.personal_info.location}</Text>
                            </View>
                        )}
                        {data.personal_info.portfolioUrl && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Website</Text>
                                <Text style={styles.contactValue}>{data.personal_info.portfolioUrl.replace(/^https?:\/\//, '')}</Text>
                            </View>
                        )}
                    </View>

                    {/* SKILLS */}
                    {data.skills.filter(s => s.visible).length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                                {data.skills.filter(s => s.visible).map((skill, i) => (
                                    <View key={i} style={styles.skillPill}>
                                        <Text style={styles.skillText}>{skill.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* LANGUAGES (SVG Circles) */}
                    {data.languages.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>{language === 'Italiano' ? 'Lingue' : 'Languages'}</Text>
                            <View style={styles.langGrid}>
                                {data.languages.slice(0, 4).map((lang, i) => {
                                    const { percentage, name } = getLanguageProficiency(lang);
                                    // r=16 for PDF to fit
                                    const radius = 16;
                                    const circumference = 2 * Math.PI * radius;
                                    const dashArray = `${circumference * (percentage / 100)} ${circumference}`;

                                    return (
                                        <View key={i} style={styles.langItem}>
                                            <View style={{ position: 'relative', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                                                {/* Background Circle */}
                                                <Svg height="40" width="40" viewBox="0 0 40 40" style={{ position: 'absolute' }}>
                                                    <Circle cx="20" cy="20" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                                                </Svg>
                                                {/* Progress Circle (Rotated -90deg via transform usually but react-pdf Svg/Circle rotation is tricky. 
                                                   We can rotate the View or just assume start point. react-pdf SVG doesn't strictly support CSS transform.
                                                   We will map the strokeDashoffset? No, array is simpler.
                                                   Wait, react-pdf Svg doesn't support 'style={{ transform... }}'. 
                                                   We can rotate the whole view? 
                                                   Or just set the start of the dash? 
                                                   Actually simplest is typically just drawing it. 
                                                   Let's try rotating the container VIEW if possible, but Text inside needs to be upright. 
                                                   Better: Use Circle transform prop if avail, or just accept it starts at 3 o'clock. 
                                                   To start at 12 o'clock (top), we need to rotate -90.
                                                */}
                                                <Svg height="40" width="40" viewBox="0 0 40 40" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                                                    <Circle
                                                        cx="20" cy="20" r={radius}
                                                        stroke="white" strokeWidth="3" fill="none"
                                                        strokeDasharray={dashArray}
                                                        strokeLinecap="round"
                                                    />
                                                </Svg>
                                                <Text style={{ fontSize: 8, color: 'white', fontWeight: 'bold' }}>{percentage}</Text> {/* Removed % char to save space if needed or keep it */}
                                            </View>
                                            <Text style={styles.langName}>{name}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
