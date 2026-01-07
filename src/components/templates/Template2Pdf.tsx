import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    main: { flex: 1, padding: 30 },
    sidebar: { width: '38%', backgroundColor: '#2C3E50', color: '#FFFFFF', padding: 20 },

    // Main Content Styles
    nameHeader: { marginBottom: 30 },
    name: { fontSize: 26, fontWeight: 'bold', textTransform: 'uppercase', color: '#2C3E50', letterSpacing: 2, marginBottom: 4 },
    title: { fontSize: 10, color: '#4B5563', letterSpacing: 1 },

    sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', color: '#2C3E50', marginBottom: 12, letterSpacing: 1 },

    expItem: { marginBottom: 15 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
    expTitle: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
    expDate: { fontSize: 8, color: '#6B7280' },
    expCompany: { fontSize: 9, fontWeight: 'bold', color: '#374151', marginBottom: 2 },
    expDesc: { fontSize: 8, color: '#4B5563', lineHeight: 1.4 },

    eduItem: { marginBottom: 8 },
    eduSchool: { fontSize: 9, fontWeight: 'bold', color: '#111827' },
    eduDate: { fontSize: 8, color: '#6B7280' },
    eduDegree: { fontSize: 8, color: '#4B5563' },

    // Sidebar Styles
    profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20, borderWidth: 4, borderColor: '#FFFFFF' },

    aboutBox: { backgroundColor: '#1a252f', padding: 15, borderRadius: 8, marginBottom: 20 },
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1, color: '#FFFFFF' },
    aboutText: { fontSize: 8, color: '#D1D5DB', lineHeight: 1.4 },

    contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    contactText: { fontSize: 8, color: '#E5E7EB', marginLeft: 6 },

    skillItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    skillDot: { width: 4, height: 4, backgroundColor: '#FFFFFF', borderRadius: 2, marginRight: 6 },
    skillText: { fontSize: 8, color: '#E5E7EB' },

    langItem: { marginBottom: 10, alignItems: 'center' },
    langCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
    langPercent: { fontSize: 8, fontWeight: 'bold', color: '#FFFFFF' },
    langName: { fontSize: 8, color: '#D1D5DB' },
    langGrid: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template2Pdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.main}>
                    <View style={styles.nameHeader}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        {data.work_experience[0]?.title && <Text style={styles.title}>{data.work_experience[0].title}</Text>}
                    </View>

                    {data.work_experience.length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            {data.work_experience.map((exp, i) => (
                                <View key={i} style={styles.expItem}>
                                    <View style={styles.expHeader}>
                                        <Text style={styles.expTitle}>{exp.title}</Text>
                                        <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                    </View>
                                    <Text style={styles.expCompany}>{exp.company}</Text>
                                    <View>
                                        {exp.description.map((desc, idx) => (
                                            <Text key={idx} style={styles.expDesc}>• {desc}</Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education.length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={styles.eduItem}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.eduSchool}>{edu.school}</Text>
                                        <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate}</Text>
                                    </View>
                                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                        <View>
                            <Text style={styles.sectionTitle}>Certifications</Text>
                            {data.certifications.filter(c => c.visible).map((cert, i) => (
                                <Text key={i} style={{ fontSize: 9, color: '#4B5563', marginBottom: 4 }}>• {cert.name}</Text>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.sidebar}>
                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}

                    {data.personal_info.summary && (
                        <View style={styles.aboutBox}>
                            <Text style={styles.sidebarTitle}>About Me</Text>
                            <Text style={styles.aboutText}>{data.personal_info.summary}</Text>
                        </View>
                    )}

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.sidebarTitle}>Contact</Text>
                        {data.personal_info.phone && (
                            <View style={styles.contactItem}>
                                <Text style={{ color: 'white', fontSize: 8 }}>📞</Text>
                                <Text style={styles.contactText}>{data.personal_info.phone}</Text>
                            </View>
                        )}
                        {data.personal_info.email && (
                            <View style={styles.contactItem}>
                                <Text style={{ color: 'white', fontSize: 8 }}>✉</Text>
                                <Text style={styles.contactText}>{data.personal_info.email}</Text>
                            </View>
                        )}
                        {data.personal_info.location && (
                            <View style={styles.contactItem}>
                                <Text style={{ color: 'white', fontSize: 8 }}>📍</Text>
                                <Text style={styles.contactText}>{data.personal_info.location}</Text>
                            </View>
                        )}
                    </View>

                    {data.skills.filter(s => s.visible).length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <View key={i} style={styles.skillItem}>
                                    <View style={styles.skillDot} />
                                    <Text style={styles.skillText}>{skill.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.languages.length > 0 && (
                        <View>
                            <Text style={styles.sidebarTitle}>Language</Text>
                            <View style={styles.langGrid}>
                                {data.languages.slice(0, 3).map((lang, i) => (
                                    <View key={i} style={styles.langItem}>
                                        <View style={styles.langCircle}>
                                            <Text style={styles.langPercent}>85%</Text>
                                        </View>
                                        <Text style={styles.langName}>{lang}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
