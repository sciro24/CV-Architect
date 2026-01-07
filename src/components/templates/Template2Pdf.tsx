import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Circle } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    main: { flex: 1, padding: 25 },
    sidebar: { width: '38%', backgroundColor: '#2C3E50', color: '#FFFFFF', padding: 20 },
    nameSection: { marginBottom: 20 },
    name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', color: '#2C3E50', letterSpacing: 1.5, marginBottom: 3 },
    jobTitle: { fontSize: 10, color: '#4B5563' },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
    profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 15, borderWidth: 3, borderColor: '#FFFFFF' },
    aboutBox: { backgroundColor: '#1a252f', borderRadius: 12, padding: 15, marginBottom: 15 },
    aboutText: { fontSize: 8, color: '#D1D5DB', lineHeight: 1.4 },
    contactItem: { fontSize: 8, marginBottom: 6, flexDirection: 'row', alignItems: 'center' },
    skillItem: { fontSize: 8, marginBottom: 4, flexDirection: 'row', alignItems: 'center' },
    bullet: { width: 4, height: 4, backgroundColor: '#FFFFFF', borderRadius: 2, marginRight: 6 },
    expItem: { marginBottom: 10 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    expTitle: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
    expDate: { fontSize: 8, color: '#6B7280' },
    expCompany: { fontSize: 9, fontWeight: 'bold', color: '#374151', marginBottom: 3 },
    expDesc: { fontSize: 8, color: '#4B5563', marginBottom: 2 },
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
                    <View style={styles.nameSection}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        <Text style={styles.jobTitle}>Marketing Manager</Text>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.work_experience.slice(0, 3).map((exp, i) => (
                            <View key={i} style={styles.expItem}>
                                <View style={styles.expHeader}>
                                    <Text style={styles.expTitle}>{exp.title}</Text>
                                    <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                </View>
                                <Text style={styles.expCompany}>{exp.company}</Text>
                                {exp.description.slice(0, 2).map((desc, idx) => (
                                    <Text key={idx} style={styles.expDesc}>• {desc}</Text>
                                ))}
                            </View>
                        ))}
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 6 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{edu.school}</Text>
                                    <Text style={{ fontSize: 8, color: '#6B7280' }}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                                <Text style={{ fontSize: 8, color: '#4B5563' }}>{edu.degree}</Text>
                            </View>
                        ))}
                    </View>

                    <View>
                        <Text style={styles.sectionTitle}>References</Text>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Harumi Kobayashi</Text>
                                <Text style={{ fontSize: 7, color: '#6B7280' }}>Salford & Co. / CEO</Text>
                                <Text style={{ fontSize: 7, color: '#6B7280' }}>Phone: 123-456-7890</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 8, fontWeight: 'bold' }}>Bailey Dupont</Text>
                                <Text style={{ fontSize: 7, color: '#6B7280' }}>Arrowal Industries / CEO</Text>
                                <Text style={{ fontSize: 7, color: '#6B7280' }}>Phone: 123-456-7890</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.sidebar}>
                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}

                    <View style={styles.aboutBox}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 6 }}>About Me</Text>
                        <Text style={styles.aboutText}>{data.personal_info.summary}</Text>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 8 }}>Contact</Text>
                        <Text style={styles.contactItem}>📞 {data.personal_info.phone}</Text>
                        <Text style={styles.contactItem}>✉ {data.personal_info.email}</Text>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 8 }}>Skills</Text>
                        {data.skills.filter(s => s.visible).map((skill, i) => (
                            <View key={i} style={styles.skillItem}>
                                <View style={styles.bullet} />
                                <Text>{skill.name}</Text>
                            </View>
                        ))}
                    </View>

                    <View>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 8 }}>Language</Text>
                        {data.languages.slice(0, 3).map((lang, i) => (
                            <Text key={i} style={{ fontSize: 8, marginBottom: 4 }}>{lang} - 85%</Text>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
