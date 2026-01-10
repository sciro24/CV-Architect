import { Packer, Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/types/resume';

export const exportToJson = (data: ResumeData, filename: string = 'resume.json') => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, filename);
};

export const exportToTxt = (data: ResumeData, filename: string = 'resume.txt') => {
    let text = `${data.personal_info.fullName}\n`;
    text += `${data.personal_info.email || ''} | ${data.personal_info.phone || ''} | ${data.personal_info.location || ''}\n`;
    if (data.personal_info.linkedinUrl) text += 'LinkedIn Profile\n';
    text += '\nAbout:\n';
    text += `${data.personal_info.summary || ''}\n\n`;

    if (data.work_experience && data.work_experience.length > 0) {
        text += 'WORK EXPERIENCE\n=================\n';
        data.work_experience.forEach(exp => {
            text += `${exp.title} at ${exp.company}\n`;
            text += `${exp.startDate} - ${exp.endDate || 'Present'}\n`;
            exp.description.forEach(d => text += ` - ${d}\n`);
            text += '\n';
        });
    }

    if (data.education && data.education.length > 0) {
        text += 'EDUCATION\n=================\n';
        data.education.forEach(edu => {
            text += `${edu.school} - ${edu.degree}\n`;
            text += `${edu.startDate} - ${edu.endDate || 'Present'}\n`;
            text += '\n';
        });
    }

    if (data.skills && data.skills.length > 0) {
        const visibleSkills = data.skills.filter(s => s.visible);
        if (visibleSkills.length > 0) {
            text += 'SKILLS\n=================\n';
            text += visibleSkills.map(s => s.name).join(', ') + '\n\n';
        }
    }

    if (data.languages && data.languages.length > 0) {
        const visibleLangs = data.languages.filter(l => l.visible);
        if (visibleLangs.length > 0) {
            text += 'LANGUAGES\n=================\n';
            text += visibleLangs.map(l => l.name).join(', ') + '\n\n';
        }
    }

    if (data.certifications && data.certifications.length > 0) {
        const visibleCerts = data.certifications.filter(c => c.visible);
        if (visibleCerts.length > 0) {
            text += 'CERTIFICATIONS\n=================\n';
            text += visibleCerts.map(c => c.name).join('\n') + '\n\n';
        }
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
};

export const exportToDocx = async (data: ResumeData, filename: string = 'resume.docx') => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: data.personal_info.fullName,
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: `${data.personal_info.email || ''} | ${data.personal_info.phone || ''} | ${data.personal_info.location || ''}`, bold: true }),
                    ],
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({ text: '' }), // Spacer

                // Summary
                ...(data.personal_info.summary ? [
                    new Paragraph({ text: 'Professional Summary', heading: HeadingLevel.HEADING_2 }),
                    new Paragraph({ text: data.personal_info.summary })
                ] : []),

                new Paragraph({ text: '' }),

                // Experience
                ...(data.work_experience && data.work_experience.length > 0 ? [
                    new Paragraph({ text: 'Work Experience', heading: HeadingLevel.HEADING_2 }),
                    ...data.work_experience.flatMap(exp => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: exp.title, bold: true, size: 24 }),
                                new TextRun({ text: ` at ${exp.company}`, italics: true }),
                            ]
                        }),
                        new Paragraph({ text: `${exp.startDate} - ${exp.endDate || 'Present'}`, alignment: AlignmentType.RIGHT }),
                        ...exp.description.map(d => new Paragraph({ text: `• ${d}`, indent: { left: 720 } })),
                        new Paragraph({ text: '' })
                    ])
                ] : []),

                // Education
                ...(data.education && data.education.length > 0 ? [
                    new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_2 }),
                    ...data.education.flatMap(edu => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: edu.school, bold: true }),
                                new TextRun({ text: ` - ${edu.degree}` }),
                            ]
                        }),
                        new Paragraph({ text: `${edu.startDate} - ${edu.endDate || 'Present'}` }),
                        new Paragraph({ text: '' })
                    ])
                ] : []),

                // Skills
                ...(data.skills && data.skills.filter(s => s.visible).length > 0 ? [
                    new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_2 }),
                    new Paragraph({ text: data.skills.filter(s => s.visible).map(s => s.name).join(', ') })
                ] : []),

                // Languages
                ...(data.languages && data.languages.filter(l => l.visible).length > 0 ? [
                    new Paragraph({ text: 'Languages', heading: HeadingLevel.HEADING_2 }),
                    new Paragraph({ text: data.languages.filter(l => l.visible).map(l => l.name).join(', ') })
                ] : []),

                // Certifications
                ...(data.certifications && data.certifications.filter(c => c.visible).length > 0 ? [
                    new Paragraph({ text: 'Certifications', heading: HeadingLevel.HEADING_2 }),
                    ...data.certifications.filter(c => c.visible).map(c => new Paragraph({ text: `• ${c.name}` }))
                ] : []),
            ],
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
};
