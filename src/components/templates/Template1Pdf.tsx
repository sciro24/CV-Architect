import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    sidebar: { width: '35%', backgroundColor: '#4A5568', color: '#FFFFFF', padding: 20 },
    profileImage: { width: 80, height: 80, borderRadius: 40, alignSelf: 'center', marginBottom: 15, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)' },
    nameSection: { textAlign: 'center', marginBottom: 20 },
    name: { fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 5 },
    jobTitle: { fontSize: 9, color: '#D1D5DB' },
    sidebarSection: { marginBottom: 20 },
    sidebarTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
    contactItem: { fontSize: 8, marginBottom: 6, flexDirection: 'row', alignItems: 'center' },
    skillItem: { fontSize: 8, marginBottom: 4, flexDirection: 'row', alignItems: 'center' },
    bullet: { width: 4, height: 4, backgroundColor: '#FFFFFF', borderRadius: 2, marginRight: 6 },
    languageItem: { marginBottom: 8 },
    languageName: { fontSize: 8, marginBottom: 3 },
    progressBar: { width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 },
    progressFill: { height: '100%', backgroundColor: '#FFFFFF', borderRadius: 2, width: '85%' },
    main: { flex: 1, padding: 25 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#1F2937', borderBottomWidth: 2, borderBottomColor: '#D1D5DB', paddingBottom: 4, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
    aboutText: { fontSize: 9, color: '#4B5563', lineHeight: 1.5, textAlign: 'justify' },
    expItem: { marginBottom: 10 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    expTitle: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
    expDate: { fontSize: 8, color: '#6B7280' },
    expCompany: { fontSize: 9, color: '#4B5563', fontStyle: 'italic', marginBottom: 4 },
    expDesc: { fontSize: 8, color: '#4B5563', lineHeight: 1.4, marginBottom: 2 },
    eduItem: { marginBottom: 6 },
    eduSchool: { fontSize: 9, fontWeight: 'bold', color: '#111827' },
    eduDegree: { fontSize: 8, color: '#4B5563' },
    eduDate: { fontSize: 8, color: '#6B7280' },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template1Pdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sidebar}>
                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}

                    <View style={styles.nameSection}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        {data.work_experience[0]?.title && (
                            <Text style={styles.jobTitle}>{data.work_experience[0].title}</Text>
                        )}
                    </View>

                    <View style={styles.sidebarSection}>
                        {data.personal_info.phone && <Text style={styles.contactItem}>📞 {data.personal_info.phone}</Text>}
                        {data.personal_info.email && <Text style={styles.contactItem}>✉ {data.personal_info.email}</Text>}
                        {data.personal_info.location && <Text style={styles.contactItem}>📍 {data.personal_info.location}</Text>}
                    </View>

                    {data.skills.filter(s => s.visible).length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <View key={i} style={styles.skillItem}>
                                    <View style={styles.bullet} />
                                    <Text>{skill.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.languages.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Language</Text>
                            {data.languages.map((lang, i) => (
                                <View key={i} style={styles.languageItem}>
                                    <Text style={styles.languageName}>{lang}</Text>
                                    <View style={styles.progressBar}>
                                        <View style={styles.progressFill} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.main}>
                    {data.personal_info.summary && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About Me</Text>
                            <Text style={styles.aboutText}>{data.personal_info.summary}</Text>
                        </View>
                    )}

                    {data.work_experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            {data.work_experience.slice(0, 3).map((exp, i) => (
                                <View key={i} style={styles.expItem}>
                                    <View style={styles.expHeader}>
                                        <Text style={styles.expTitle}>{exp.title}</Text>
                                        <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                    </View>
                                    <Text style={styles.expCompany}>{exp.company} - {exp.location}</Text>
                                    {exp.description.slice(0, 2).map((desc, idx) => (
                                        <Text key={idx} style={styles.expDesc}>• {desc}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={styles.eduItem}>
                                    <Text style={styles.eduSchool}>{edu.school}</Text>
                                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                                    <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Certifications</Text>
                            {data.certifications.filter(c => c.visible).map((cert, i) => (
                                <Text key={i} style={{ fontSize: 8, color: '#4B5563', marginBottom: 2 }}>• {cert.name}</Text>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
