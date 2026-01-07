import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    sidebar: { width: '35%', backgroundColor: '#F3F4F6', paddingTop: 230, paddingHorizontal: 20 },
    main: { flex: 1, backgroundColor: '#FFFFFF' },

    // Header Block inside Main
    headerBlock: { height: 150, backgroundColor: '#1F2937', paddingHorizontal: 30, justifyContent: 'center' },
    name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#FFFFFF', marginBottom: 4 },
    jobTitle: { fontSize: 10, color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: 1 },

    // Content
    content: { padding: 30, paddingTop: 80 },

    // Profile Image
    profileImage: { position: 'absolute', top: 90, left: 30, width: 120, height: 120, borderRadius: 60, borderWidth: 6, borderColor: '#FFFFFF' },

    // Sidebar styles
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#D1D5DB', paddingBottom: 2, color: '#1F2937', width: 30 },
    sidebarItem: { marginBottom: 20 },

    // Progress Bar
    skillContainer: { marginBottom: 6 },
    skillName: { fontSize: 8, fontWeight: 'bold', color: '#374151', marginBottom: 2 },
    progressBg: { width: '100%', height: 3, backgroundColor: '#D1D5DB', borderRadius: 1.5 },
    progressFill: { height: '100%', backgroundColor: '#1F2937', borderRadius: 1.5 },

    // Lang with dot
    langItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    langDot: { width: 4, height: 4, backgroundColor: '#1F2937', borderRadius: 2, marginRight: 6 },

    // Main Styles
    sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1, color: '#1F2937', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 4 },

    contactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 25 },
    contactItem: { width: '45%', marginBottom: 8 },
    contactLabel: { fontSize: 7, textTransform: 'uppercase', color: '#6B7280', marginBottom: 1 },
    contactValue: { fontSize: 8, fontWeight: 'bold', color: '#1F2937' },

    expItem: { marginBottom: 15, paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: '#E5E7EB', position: 'relative' },
    expDot: { position: 'absolute', left: -3.5, top: 0, width: 6, height: 6, backgroundColor: '#1F2937', borderRadius: 3, border: '1px solid white' },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
    expTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#111827' },
    expDate: { fontSize: 7, color: '#4B5563', backgroundColor: '#F3F4F6', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2 },
    expCompany: { fontSize: 8, color: '#4B5563', fontWeight: 'bold', marginBottom: 2 },
    expDesc: { fontSize: 8, color: '#4B5563', lineHeight: 1.4 },

    certBox: { backgroundColor: '#F9FAFB', padding: 6, borderRadius: 2, border: '1px solid #E5E7EB', marginBottom: 4 },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template4Pdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sidebar}>
                    {data.personal_info.summary && (
                        <View style={styles.sidebarItem}>
                            <Text style={styles.sidebarTitle}>Profile</Text>
                            <Text style={{ fontSize: 8, color: '#4B5563', lineHeight: 1.5, textAlign: 'justify', marginTop: 4 }}>
                                {data.personal_info.summary}
                            </Text>
                        </View>
                    )}

                    {data.education.length > 0 && (
                        <View style={styles.sidebarItem}>
                            <Text style={styles.sidebarTitle}>Education</Text>
                            <View style={{ marginTop: 4 }}>
                                {data.education.map((edu, i) => (
                                    <View key={i} style={{ marginBottom: 8 }}>
                                        <Text style={{ fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#1F2937' }}>{edu.degree}</Text>
                                        <Text style={{ fontSize: 8, color: '#4B5563' }}>{edu.school}</Text>
                                        <Text style={{ fontSize: 7, color: '#6B7280' }}>{edu.startDate} - {edu.endDate}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data.skills.filter(s => s.visible).length > 0 && (
                        <View style={styles.sidebarItem}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            <View style={{ marginTop: 4 }}>
                                {data.skills.filter(s => s.visible).map((skill, i) => (
                                    <View key={i} style={styles.skillContainer}>
                                        <Text style={styles.skillName}>{skill.name}</Text>
                                        <View style={styles.progressBg}>
                                            <View style={[styles.progressFill, { width: `${80 - (i * 5)}%` }]} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {data.languages.length > 0 && (
                        <View style={styles.sidebarItem}>
                            <Text style={styles.sidebarTitle}>Language</Text>
                            <View style={{ marginTop: 4 }}>
                                {data.languages.map((lang, i) => (
                                    <View key={i} style={styles.langItem}>
                                        <View style={styles.langDot} />
                                        <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#1F2937' }}>{lang}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.main}>
                    <View style={styles.headerBlock}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        {data.work_experience[0]?.title && <Text style={styles.jobTitle}>{data.work_experience[0].title}</Text>}
                    </View>

                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}

                    <View style={styles.content}>
                        <View style={styles.contactGrid}>
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
                            {data.personal_info.portfolioUrl && (
                                <View style={styles.contactItem}>
                                    <Text style={styles.contactLabel}>Website</Text>
                                    <Text style={styles.contactValue}>{data.personal_info.portfolioUrl}</Text>
                                </View>
                            )}
                            {data.personal_info.location && (
                                <View style={styles.contactItem}>
                                    <Text style={styles.contactLabel}>Address</Text>
                                    <Text style={styles.contactValue}>{data.personal_info.location}</Text>
                                </View>
                            )}
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
                                        <Text style={styles.expCompany}>{exp.company} | {exp.location}</Text>
                                        {exp.description.map((desc, idx) => (
                                            <Text key={idx} style={styles.expDesc}>{desc}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}

                        {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                            <View>
                                <Text style={styles.sectionTitle}>Certifications</Text>
                                {data.certifications.filter(c => c.visible).map((cert, i) => (
                                    <View key={i} style={styles.certBox}>
                                        <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#374151' }}>{cert.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
