import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    header: { backgroundColor: '#B8D4E8', padding: 20, flexDirection: 'row', alignItems: 'center', gap: 15 },
    profileImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#FFFFFF' },
    nameSection: { flex: 1 },
    name: { fontSize: 22, fontWeight: 'bold', textTransform: 'uppercase', color: '#374151', letterSpacing: 1.5, marginBottom: 3 },
    jobTitle: { fontSize: 11, color: '#4B5563' },
    content: { flexDirection: 'row' },
    sidebar: { width: '35%', backgroundColor: '#C5D9E6', padding: 20 },
    main: { flex: 1, padding: 25 },
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, color: '#1F2937' },
    contactItem: { fontSize: 8, marginBottom: 6, color: '#374151' },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1F2937', borderBottomWidth: 1, borderBottomColor: '#D1D5DB', paddingBottom: 4, marginBottom: 10 },
    text: { fontSize: 8, color: '#4B5563', lineHeight: 1.4 },
    skillItem: { fontSize: 8, marginBottom: 4, color: '#374151', flexDirection: 'row', alignItems: 'center' },
    bullet: { width: 4, height: 4, backgroundColor: '#4B5563', borderRadius: 2, marginRight: 6 },
    expItem: { marginBottom: 10 },
    expDate: { fontSize: 9, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
    expTitle: { fontSize: 9, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 },
    expCompany: { fontSize: 8, color: '#6B7280', fontStyle: 'italic', marginBottom: 4 },
    expDesc: { fontSize: 8, color: '#4B5563', marginBottom: 2 },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template3Pdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}
                    <View style={styles.nameSection}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        <Text style={styles.jobTitle}>Sales Representative</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.sidebar}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.contactItem}>📞 {data.personal_info.phone}</Text>
                            <Text style={styles.contactItem}>✉ {data.personal_info.email}</Text>
                            <Text style={styles.contactItem}>📍 {data.personal_info.location}</Text>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sidebarTitle}>Education</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1F2937' }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: 8, color: '#374151' }}>{edu.school}</Text>
                                    <Text style={{ fontSize: 8, color: '#6B7280' }}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <View key={i} style={styles.skillItem}>
                                    <View style={styles.bullet} />
                                    <Text>{skill.name}</Text>
                                </View>
                            ))}
                        </View>

                        <View>
                            <Text style={styles.sidebarTitle}>Language</Text>
                            {data.languages.map((lang, i) => (
                                <Text key={i} style={{ fontSize: 8, color: '#374151', marginBottom: 4 }}>{lang}</Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.main}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sectionTitle}>About Me</Text>
                            <Text style={styles.text}>{data.personal_info.summary}</Text>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.sectionTitle}>Work Experience</Text>
                            {data.work_experience.slice(0, 3).map((exp, i) => (
                                <View key={i} style={styles.expItem}>
                                    <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                    <Text style={styles.expTitle}>{exp.title}</Text>
                                    <Text style={styles.expCompany}>{exp.company}</Text>
                                    {exp.description.slice(0, 2).map((desc, idx) => (
                                        <Text key={idx} style={styles.expDesc}>• {desc}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>

                        <View>
                            <Text style={styles.sectionTitle}>References</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Estelle Darcy</Text>
                                    <Text style={{ fontSize: 7, color: '#6B7280' }}>Wardiere Inc. / CEO</Text>
                                    <Text style={{ fontSize: 7, color: '#6B7280' }}>Phone: 123-456-7890</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Harper Russo</Text>
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
