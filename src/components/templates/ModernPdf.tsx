import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    sidebar: {
        width: '32%',
        backgroundColor: '#1a202c', // Darker slate
        color: '#f7fafc',
        padding: 24,
        height: '100%',
    },
    main: {
        width: '68%',
        padding: 35,
        paddingTop: 45,
        height: '100%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#4a5568',
        alignSelf: 'center',
        marginBottom: 15,
        objectFit: 'cover',
    },
    sidebarName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    sidebarLocation: {
        fontSize: 10,
        textAlign: 'center',
        color: '#a0aec0', // Gray 400
        marginBottom: 25,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    sidebarSection: {
        marginBottom: 25,
    },
    sidebarTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#718096', // Gray 500
        borderBottomWidth: 1,
        borderBottomColor: '#2d3748',
        paddingBottom: 5,
        marginBottom: 10,
        letterSpacing: 2,
    },
    sidebarText: {
        fontSize: 10,
        color: '#e2e8f0', // Gray 200
        marginBottom: 4,
        lineHeight: 1.3,
    },
    skillTag: {
        backgroundColor: '#2d3748', // Gray 700
        color: '#edf2f7', // Gray 100
        paddingVertical: 3,
        paddingHorizontal: 6,
        marginBottom: 5,
        borderRadius: 3,
        fontSize: 9,
        alignSelf: 'flex-start',
    },
    mainSection: {
        marginBottom: 25,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a202c', // Gray 900
        borderBottomWidth: 2,
        borderBottomColor: '#3182ce', // Blue 500
        paddingBottom: 3,
        marginBottom: 12,
        alignSelf: 'flex-start',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    summaryText: {
        fontSize: 10,
        color: '#4a5568', // Gray 700
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    expItem: {
        marginBottom: 15,
        borderLeftWidth: 2,
        borderLeftColor: '#e2e8f0', // Gray 200
        paddingLeft: 15,
        marginLeft: 4,
    },
    // Dot decoration for timeline
    timelineDot: {
        position: 'absolute',
        left: -20, // Adjust based on margin/padding
        top: 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3182ce',
        borderWidth: 2,
        borderColor: 'white',
    },
    expTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a202c',
    },
    expCompanyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 5,
    },
    expCompany: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2b6cb0', // Blue 700
    },
    expDate: {
        fontSize: 10,
        color: '#718096', // Gray 500
        fontStyle: 'italic',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    bullet: {
        width: 10,
        fontSize: 10,
        color: '#718096',
    },
    bulletText: {
        flex: 1,
        fontSize: 9.5,
        color: '#4a5568',
        lineHeight: 1.3,
    },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const ModernPdf: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sidebar}>
                    <View>
                        {profileImage && (
                            <Image src={profileImage} style={styles.profileImage} />
                        )}
                        <Text style={styles.sidebarName}>{data.personal_info.fullName}</Text>
                        <Text style={styles.sidebarLocation}>{data.personal_info.location}</Text>
                    </View>

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>{t.contact}</Text>
                        <Text style={styles.sidebarText}>{data.personal_info.email}</Text>
                        <Text style={styles.sidebarText}>{data.personal_info.phone}</Text>
                        {data.personal_info.linkedinUrl && <Text style={styles.sidebarText}>{data.personal_info.linkedinUrl}</Text>}
                        {data.personal_info.portfolioUrl && <Text style={styles.sidebarText}>{data.personal_info.portfolioUrl}</Text>}
                    </View>

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>{t.skills}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {data.skills.filter(s => s.visible).map((skill, index) => (
                                <Text key={index} style={styles.skillTag}>{skill.name}</Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>{t.languages}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {data.languages.map((lang, index) => (
                                <Text key={index} style={styles.sidebarText}>{lang}</Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>{t.education}</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>{edu.school}</Text>
                                <Text style={[styles.sidebarText, { fontStyle: 'italic', marginBottom: 1 }]}>{edu.degree}</Text>
                                <Text style={{ color: '#718096', fontSize: 9 }}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>{t.summary}</Text>
                        <Text style={styles.summaryText}>{data.personal_info.summary}</Text>
                    </View>

                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>{t.experience}</Text>
                        {data.work_experience.map((exp, index) => (
                            <View key={index} style={styles.expItem}>
                                <Text style={styles.expTitle}>{exp.title}</Text>
                                <View style={styles.expCompanyRow}>
                                    <Text style={styles.expCompany}>{exp.company}</Text>
                                    <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                </View>
                                {exp.description.map((desc, i) => (
                                    <View key={i} style={styles.bulletPoint}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.bulletText}>{desc}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
