export type Language = 'Italiano' | 'English' | 'Español' | 'Français' | 'Deutsch';

export const dictionary: Record<Language, {
    contact: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    downloadPdf: string;
    generatedWith: string;
}> = {
    'Italiano': {
        contact: 'Contatti',
        summary: 'Profilo',
        experience: 'Esperienza Lavorativa',
        education: 'Formazione',
        skills: 'Competenze',
        languages: 'Lingue',
        downloadPdf: 'Scarica PDF',
        generatedWith: 'Generato con LinkedIn to CV',
    },
    'English': {
        contact: 'Contact',
        summary: 'Profile',
        experience: 'Work Experience',
        education: 'Education',
        skills: 'Skills',
        languages: 'Languages',
        downloadPdf: 'Download PDF',
        generatedWith: 'Generated with LinkedIn to CV',
    },
    'Español': {
        contact: 'Contacto',
        summary: 'Perfil',
        experience: 'Experiencia Laboral',
        education: 'Educación',
        skills: 'Habilidades',
        languages: 'Idiomas',
        downloadPdf: 'Descargar PDF',
        generatedWith: 'Generado con LinkedIn to CV',
    },
    'Français': {
        contact: 'Contact',
        summary: 'Profil',
        experience: 'Expérience Professionnelle',
        education: 'Formation',
        skills: 'Compétences',
        languages: 'Langues',
        downloadPdf: 'Télécharger PDF',
        generatedWith: 'Généré avec LinkedIn to CV',
    },
    'Deutsch': {
        contact: 'Kontakt',
        summary: 'Profil',
        experience: 'Berufserfahrung',
        education: 'Ausbildung',
        skills: 'Fähigkeiten',
        languages: 'Sprachen',
        downloadPdf: 'PDF Herunterladen',
        generatedWith: 'Erstellt mit LinkedIn to CV',
    }
};
