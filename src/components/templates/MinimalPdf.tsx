import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT_v30.woff2' },
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333333',
    },
    header: {
        marginBottom: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#111827',
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerLeft: {
        flexGrow: 1,
        paddingRight: 20,
    },
    headerRight: {
        marginLeft: 10,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 6,
        color: '#000000',
    },
    contact: {
        fontSize: 9,
        color: '#4B5563',
        lineHeight: 1.4,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        objectFit: 'cover',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        marginBottom: 12,
        paddingBottom: 4,
        marginTop: 18,
        color: '#111827',
        letterSpacing: 1,
    },
    sectionContent: {
        marginBottom: 5,
    },
    summary: {
        marginBottom: 10,
        textAlign: 'justify',
    },
    experienceItem: {
        marginBottom: 12,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        alignItems: 'baseline',
    },
    expTitle: {
        fontWeight: 'bold',
        fontSize: 11,
        color: '#000000',
    },
    expDate: {
        fontSize: 9,
        color: '#6B7280',
        fontStyle: 'italic',
    },
    expCompany: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#374151',
        marginBottom: 4,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 5,
    },
    bullet: {
        width: 10,
        fontSize: 10,
        color: '#6B7280',
    },
    bulletText: {
        flex: 1,
        fontSize: 9.5,
        color: '#4B5563',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontSize: 9,
        color: '#1F2937',
    },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const MinimalPdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        <View style={styles.contact}>
                            <Text style={{ marginBottom: 2 }}>{data.personal_info.location} • {data.personal_info.email} • {data.personal_info.phone}</Text>
                            <LinkText url={data.personal_info.linkedinUrl} label="LinkedIn" />
                            <LinkText url={data.personal_info.portfolioUrl} label="Portfolio" prefix=" • " />
                        </View>
                    </View>
                    {profileImage && (
                        <View style={styles.headerRight}>
                            <Image src={profileImage} style={styles.profileImage} />
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>{t.summary}</Text>
                    <Text style={styles.summary}>{data.personal_info.summary}</Text>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>{t.experience}</Text>
                    {data.work_experience.map((exp, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.expTitle}>{exp.title}</Text>
                                <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                            </View>
                            <Text style={styles.expCompany}>{exp.company}, {exp.location}</Text>
                            {exp.description.map((desc, i) => (
                                <View key={i} style={styles.bulletPoint}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>{desc}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>{t.education}</Text>
                    {data.education.map((edu, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.expTitle}>{edu.school}</Text>
                                <Text style={styles.expDate}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                            <Text style={[styles.expCompany, { fontStyle: 'normal' }]}>{edu.degree}, {edu.location}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>{t.skills}</Text>
                    <View style={styles.skillsContainer}>
                        {data.skills.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>{t.languages}</Text>
                    <View style={styles.skillsContainer}>
                        {data.languages.map((lang, index) => (
                            <View key={index} style={[styles.skillTag, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#D1D5DB' }]}>
                                <Text>{lang}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const LinkText = ({ url, label, prefix = '' }: { url?: string, label: string, prefix?: string }) => {
    if (!url) return null;
    return <Text>{prefix}{url}</Text>; // Simply rendering text for now to avoid layout issues with Link
}
