import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    header: { flexDirection: 'row', alignItems: 'center' },
    headerLeft: { width: '40%', padding: 25, alignItems: 'center', justifyContent: 'center' },
    profileImage: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#FFFFFF' },
    headerRight: { flex: 1, backgroundColor: '#1F2937', padding: 20, marginLeft: -20 },
    name: { fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: 1.5, marginBottom: 3 },
    jobTitle: { fontSize: 10, color: '#D1D5DB', letterSpacing: 1 },
    content: { flexDirection: 'row' },
    sidebar: { width: '40%', backgroundColor: '#F3F4F6', padding: 20 },
    main: { flex: 1, padding: 25 },
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, color: '#1F2937' },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, color: '#1F2937' },
    aboutText: { fontSize: 8, color: '#4B5563', lineHeight: 1.4, textAlign: 'justify', marginBottom: 15 },
    eduItem: { marginBottom: 10 },
    eduDegree: { fontSize: 8, fontWeight: 'bold', color: '#1F2937' },
    eduSchool: { fontSize: 8, color: '#6B7280' },
    eduDate: { fontSize: 8, color: '#9CA3AF' },
    skillItem: { marginBottom: 8 },
    skillName: { fontSize: 8, color: '#374151', marginBottom: 3 },
    progressBar: { width: '100%', height: 4, backgroundColor: '#D1D5DB', borderRadius: 2 },
    progressFill: { height: '100%', backgroundColor: '#1F2937', borderRadius: 2, width: '85%' },
    langItem: { fontSize: 8, color: '#374151', marginBottom: 4, flexDirection: 'row', alignItems: 'center' },
    bullet: { width: 4, height: 4, backgroundColor: '#4B5563', borderRadius: 2, marginRight: 6 },
    contactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
    contactItem: { fontSize: 8, color: '#4B5563', width: '45%' },
    expItem: { marginBottom: 12, paddingLeft: 15, borderLeftWidth: 2, borderLeftColor: '#D1D5DB', position: 'relative' },
    expDot: { position: 'absolute', left: -6, top: 2, width: 8, height: 8, backgroundColor: '#9CA3AF', borderRadius: 4 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    expTitle: { fontSize: 9, fontWeight: 'bold', color: '#111827' },
    expDate: { fontSize: 8, color: '#6B7280' },
    expCompany: { fontSize: 8, color: '#4B5563', marginBottom: 4 },
    expDesc: { fontSize: 8, color: '#4B5563', lineHeight: 1.4 },
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
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {profileImage && <Image src={profileImage} style={styles.profileImage} />}
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        <Text style={styles.jobTitle}>Marketing Manager</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.sidebar}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sidebarTitle}>About Me</Text>
                            <Text style={styles.aboutText}>{data.personal_info.summary}</Text>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sidebarTitle}>Education</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={styles.eduItem}>
                                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                                    <Text style={styles.eduSchool}>{edu.school}</Text>
                                    <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            {data.skills.filter(s => s.visible).slice(0, 6).map((skill, i) => (
                                <View key={i} style={styles.skillItem}>
                                    <Text style={styles.skillName}>{skill.name}</Text>
                                    <View style={styles.progressBar}>
                                        <View style={styles.progressFill} />
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View>
                            <Text style={styles.sidebarTitle}>Language</Text>
                            {data.languages.map((lang, i) => (
                                <View key={i} style={styles.langItem}>
                                    <View style={styles.bullet} />
                                    <Text>{lang}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.main}>
                        <View style={styles.contactGrid}>
                            <Text style={styles.contactItem}>📞 {data.personal_info.phone}</Text>
                            <Text style={styles.contactItem}>🌐 www.reallygreatsite.com</Text>
                            <Text style={styles.contactItem}>✉ {data.personal_info.email}</Text>
                            <Text style={styles.contactItem}>📍 {data.personal_info.location}</Text>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            {data.work_experience.slice(0, 3).map((exp, i) => (
                                <View key={i} style={styles.expItem}>
                                    <View style={styles.expDot} />
                                    <View style={styles.expHeader}>
                                        <Text style={styles.expTitle}>{exp.title}</Text>
                                        <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                    </View>
                                    <Text style={styles.expCompany}>{exp.company} | {exp.location}</Text>
                                    <Text style={styles.expDesc}>{exp.description.join(' ')}</Text>
                                </View>
                            ))}
                        </View>

                        <View>
                            <Text style={styles.sectionTitle}>References</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Harumi Kobayashi</Text>
                                    <Text style={{ fontSize: 7, color: '#6B7280' }}>Wardiere Inc. / CEO</Text>
                                    <Text style={{ fontSize: 7, color: '#6B7280' }}>Phone: 123-456-7890</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Bailey Dupont</Text>
                                    <Text style={{ fontSize: 7, color: '#6B7280' }}>Wardiere Inc. / CEO</Text>
                                    <Text style={{ fontSize: 7, color: '#6B7280' }}>Phone: 123-456-7890</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
