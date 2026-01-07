import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica', fontSize: 9 },
    header: { height: 130, backgroundColor: '#B8D4E8', paddingHorizontal: 30, paddingVertical: 20, justifyContent: 'center' },
    name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4, color: '#1F2937' },
    jobTitle: { fontSize: 12, color: '#374151', letterSpacing: 1 },
    body: { flexDirection: 'row', flexGrow: 1 },
    sidebar: { width: '30%', backgroundColor: '#C5D9E6', paddingHorizontal: 20, paddingTop: 80, paddingBottom: 20 },
    main: { flex: 1, padding: 30 },
    profileImage: { position: 'absolute', top: 70, left: 29, width: 120, height: 120, borderRadius: 60, borderColor: '#FFFFFF', borderWidth: 4 },

    // Section Styles
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#9CA3AF', paddingBottom: 2, color: '#1F2937' },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1, color: '#1F2937' },
    separationLine: { height: 2, width: 30, backgroundColor: '#1F2937', marginBottom: 15 },

    text: { fontSize: 9, color: '#4B5563', lineHeight: 1.5, textAlign: 'justify' },
    contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    iconCircle: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 6 },
    contactText: { fontSize: 8, color: '#374151' },

    skillItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    bullet: { width: 4, height: 4, backgroundColor: '#4B5563', borderRadius: 2, marginRight: 6 },

    expItem: { marginBottom: 15 },
    expHeader: { flexDirection: 'column', marginBottom: 2 },
    expTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', color: '#111827' },
    expSub: { fontSize: 9, color: '#4B5563', fontWeight: 'bold', marginBottom: 2 },
    expDesc: { fontSize: 8, color: '#4B5563', lineHeight: 1.4, marginLeft: 0 },

    certItem: { flexDirection: 'row', marginBottom: 3 },
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
                    <View style={{ marginLeft: '30%', paddingLeft: 20 }}>
                        <Text style={styles.name}>{data.personal_info.fullName}</Text>
                        {data.work_experience[0]?.title && <Text style={styles.jobTitle}>{data.work_experience[0].title}</Text>}
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.sidebar}>
                        <View style={{ marginBottom: 20 }}>
                            {data.personal_info.phone && (
                                <View style={styles.contactItem}>
                                    <View style={styles.iconCircle}><Text style={{ fontSize: 7 }}>📞</Text></View>
                                    <Text style={styles.contactText}>{data.personal_info.phone}</Text>
                                </View>
                            )}
                            {data.personal_info.email && (
                                <View style={styles.contactItem}>
                                    <View style={styles.iconCircle}><Text style={{ fontSize: 7 }}>✉</Text></View>
                                    <Text style={styles.contactText}>{data.personal_info.email}</Text>
                                </View>
                            )}
                            {data.personal_info.location && (
                                <View style={styles.contactItem}>
                                    <View style={styles.iconCircle}><Text style={{ fontSize: 7 }}>📍</Text></View>
                                    <Text style={styles.contactText}>{data.personal_info.location}</Text>
                                </View>
                            )}
                        </View>

                        {data.education.length > 0 && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sidebarTitle}>Education</Text>
                                {data.education.map((edu, i) => (
                                    <View key={i} style={{ marginBottom: 8 }}>
                                        <Text style={{ fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#1F2937' }}>{edu.degree}</Text>
                                        <Text style={{ fontSize: 8, color: '#374151' }}>{edu.school}</Text>
                                        <Text style={{ fontSize: 7, color: '#6B7280' }}>{edu.startDate} - {edu.endDate}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {data.skills.filter(s => s.visible).length > 0 && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sidebarTitle}>Skills</Text>
                                {data.skills.filter(s => s.visible).map((skill, i) => (
                                    <View key={i} style={styles.skillItem}>
                                        <View style={styles.bullet} />
                                        <Text style={{ fontSize: 8, color: '#374151', fontWeight: 'bold' }}>{skill.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {data.languages.length > 0 && (
                            <View>
                                <Text style={styles.sidebarTitle}>Language</Text>
                                {data.languages.map((lang, i) => (
                                    <Text key={i} style={{ fontSize: 8, marginBottom: 4, fontWeight: 'bold', color: '#374151' }}>{lang}</Text>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.main}>
                        {data.personal_info.summary && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sectionTitle}>About Me</Text>
                                <View style={styles.separationLine} />
                                <Text style={styles.text}>{data.personal_info.summary}</Text>
                            </View>
                        )}

                        {data.work_experience.length > 0 && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sectionTitle}>Work Experience</Text>
                                <View style={styles.separationLine} />
                                {data.work_experience.map((exp, i) => (
                                    <View key={i} style={styles.expItem}>
                                        <View style={styles.expHeader}>
                                            <Text style={styles.expTitle}>{exp.title}</Text>
                                            <Text style={styles.expSub}>{exp.company} | {exp.startDate} - {exp.endDate}</Text>
                                        </View>
                                        {exp.description.map((desc, idx) => (
                                            <Text key={idx} style={styles.expDesc}>• {desc}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}

                        {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                            <View>
                                <Text style={styles.sectionTitle}>Certifications</Text>
                                <View style={styles.separationLine} />
                                {data.certifications.filter(c => c.visible).map((cert, i) => (
                                    <View key={i} style={styles.certItem}>
                                        <Text style={{ fontSize: 9, color: '#4B5563', marginRight: 4 }}>•</Text>
                                        <Text style={{ fontSize: 9, color: '#4B5563' }}>{cert.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                {profileImage && <Image src={profileImage} style={styles.profileImage} />}
            </Page>
        </Document>
    );
};
