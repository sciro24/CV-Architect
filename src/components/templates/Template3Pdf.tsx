import React, { useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 9, // Smaller base font
        lineHeight: 1.4,
        color: '#2d3748',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cbd5e0',
        paddingBottom: 10,
        alignItems: 'center',
    },
    headerLeft: {
        flexGrow: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a202c',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 10,
        color: '#4a5568',
        marginTop: 2,
        marginBottom: 4,
    },
    contacts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        fontSize: 8,
        color: '#718096',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 15,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#2b6cb0',
        borderBottomWidth: 1,
        borderBottomColor: '#2b6cb0',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    content: {
        fontSize: 9,
    },
    expItem: {
        marginBottom: 6,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    expTitle: {
        fontWeight: 'bold',
        fontSize: 9.5,
    },
    expDate: {
        fontSize: 8,
        color: '#718096',
        fontStyle: 'italic',
    },
    expCompany: {
        fontSize: 9,
        fontStyle: 'italic',
        color: '#4a5568',
        marginBottom: 2,
    },
    bulletConfig: {
        flexDirection: 'row',
        marginBottom: 1,
    },
    bulletIcon: {
        width: 8,
        fontSize: 8,
        color: '#718096',
    },
    bulletText: {
        flex: 1,
        fontSize: 8.5,
        color: '#4a5568',
    },
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    skillItem: {
        backgroundColor: '#ebf8ff',
        color: '#2b6cb0',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 8,
    }
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
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        <Text style={styles.subtitle}>{data.personal_info.location}</Text>
                        <View style={styles.contacts}>
                            <Text>{data.personal_info.email}</Text>
                            <Text>{data.personal_info.phone}</Text>
                            {data.personal_info.linkedinUrl && <Text>LinkedIn</Text>}
                        </View>
                    </View>
                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.summary}</Text>
                    <Text style={styles.content}>{data.personal_info.summary}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.experience}</Text>
                    {data.work_experience.slice(0, 4).map((exp, index) => (
                        <View key={index} style={styles.expItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.expTitle}>{exp.title}</Text>
                                <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                            </View>
                            <Text style={styles.expCompany}>{exp.company}, {exp.location}</Text>
                            {exp.description.slice(0, 2).map((desc, i) => (
                                <View key={i} style={styles.bulletConfig}>
                                    <Text style={styles.bulletIcon}>•</Text>
                                    <Text style={styles.bulletText}>{desc}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t.education}</Text>
                    {data.education.slice(0, 2).map((edu, index) => (
                        <View key={index} style={styles.expItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.expTitle}>{edu.school}</Text>
                                <Text style={styles.expDate}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                            <Text style={styles.expCompany}>{edu.degree}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.section, { flexDirection: 'row', gap: 20 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.sectionTitle}>{t.skills}</Text>
                        <View style={styles.skillsRow}>
                            {data.skills.filter(s => s.visible).slice(0, 8).map((skill, i) => (
                                <Text key={i} style={styles.skillItem}>{skill.name}</Text>
                            ))}
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.sectionTitle}>{t.languages}</Text>
                        <View style={styles.skillsRow}>
                            {data.languages.map((lang, i) => (
                                <Text key={i} style={[styles.skillItem, { backgroundColor: '#f7fafc', color: '#4a5568', borderWidth: 1, borderColor: '#e2e8f0' }]}>{lang}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
