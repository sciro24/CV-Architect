import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Helvetica',
        fontSize: 9,
        lineHeight: 1.4,
        color: '#000',
    },
    header: {
        backgroundColor: '#374151',
        padding: 30,
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    role: {
        fontSize: 11,
        color: '#9CA3AF',
        marginBottom: 8,
    },
    contact: {
        fontSize: 8,
        color: '#D1D5DB',
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 8,
        marginLeft: 20,
    },
    body: {
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#374151',
        borderBottomWidth: 2,
        borderBottomColor: '#374151',
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 2,
    },
    summary: {
        fontSize: 9,
        marginBottom: 10,
        color: '#4B5563',
    },
    row: {
        flexDirection: 'row',
        gap: 20,
    },
    leftCol: {
        flex: 2,
    },
    rightCol: {
        flex: 1,
    },
    expItem: {
        marginBottom: 8,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    expTitle: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    expCompany: {
        fontSize: 9,
        color: '#4B5563',
        fontStyle: 'italic',
    },
    expDate: {
        fontSize: 8,
        color: '#6B7280',
    },
    bullet: {
        flexDirection: 'row',
        paddingLeft: 4,
    },
    bulletText: {
        fontSize: 8.5,
        color: '#4B5563',
        flex: 1,
    },
    tag: {
        backgroundColor: '#F3F4F6',
        padding: 3,
        marginBottom: 3,
        fontSize: 8,
        borderRadius: 2,
        color: '#374151',
    }
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
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        <Text style={styles.contact}>{data.personal_info.email} | {data.personal_info.phone} | {data.personal_info.location}</Text>
                    </View>
                    {profileImage && <Image src={profileImage} style={styles.profileImage} />}
                </View>

                <View style={styles.body}>
                    <Text style={styles.summary}>{data.personal_info.summary}</Text>

                    <View style={styles.row}>
                        <View style={styles.leftCol}>
                            <Text style={styles.sectionTitle}>{t.experience}</Text>
                            {data.work_experience.slice(0, 4).map((exp, index) => (
                                <View key={index} style={styles.expItem}>
                                    <View style={styles.expHeader}>
                                        <Text style={styles.expTitle}>{exp.title}</Text>
                                        <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                    </View>
                                    <Text style={styles.expCompany}>{exp.company}, {exp.location}</Text>
                                    {exp.description.slice(0, 2).map((d, i) => (
                                        <View key={i} style={styles.bullet}>
                                            <Text style={{ width: 6, fontSize: 8 }}>•</Text>
                                            <Text style={styles.bulletText}>{d}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>

                        <View style={styles.rightCol}>
                            <Text style={styles.sectionTitle}>{t.education}</Text>
                            {data.education.map((edu, index) => (
                                <View key={index} style={{ marginBottom: 6 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 9 }}>{edu.school}</Text>
                                    <Text style={{ fontSize: 8.5, color: '#4B5563' }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: 8, color: '#9CA3AF' }}>{edu.endDate}</Text>
                                </View>
                            ))}

                            <Text style={styles.sectionTitle}>{t.skills}</Text>
                            {data.skills.filter(s => s.visible).slice(0, 10).map((skill, i) => (
                                <Text key={i} style={styles.tag}>{skill.name}</Text>
                            ))}

                            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>{t.languages}</Text>
                            {data.languages.map((l, i) => (
                                <Text key={i} style={{ fontSize: 8.5, marginBottom: 2 }}>{l}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
