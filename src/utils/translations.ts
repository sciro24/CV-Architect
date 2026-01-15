export type Language = 'Italiano' | 'English' | 'Español' | 'Français' | 'Deutsch';

export const dictionary: Record<Language, {
    contact: string;
    summary: string;
    experience: string;
    education: string;
    certifications: string;
    skills: string;
    languages: string;
    downloadPdf: string;
    generatedWith: string;
    chatGreeting: string;
}> = {
    'Italiano': {
        contact: 'Contatti',
        summary: 'Profilo',
        experience: 'Esperienza Lavorativa',
        education: 'Formazione',
        certifications: 'Certificazioni',
        skills: 'Competenze',
        languages: 'Lingue',
        downloadPdf: 'Scarica PDF',
        generatedWith: 'Generato con LinkedIn to CV',
        chatGreeting: "Ciao! Sono il tuo Recruiter IA. Ti aiuterò a creare il tuo CV. Iniziamo con il tuo nome e il tuo ruolo o titolo professionale attuale?"
    },
    'English': {
        contact: 'Contact',
        summary: 'Profile',
        experience: 'Work Experience',
        education: 'Education',
        certifications: 'Certifications',
        skills: 'Skills',
        languages: 'Languages',
        downloadPdf: 'Download PDF',
        generatedWith: 'Generated with LinkedIn to CV',
        chatGreeting: "Hi! I'm your AI Recruiter. I'm here to help you build your CV. Let's start with your name and your current role or professional title?"
    },
    'Español': {
        contact: 'Contacto',
        summary: 'Perfil',
        experience: 'Experiencia Laboral',
        education: 'Educación',
        certifications: 'Certificaciones',
        skills: 'Habilidades',
        languages: 'Idiomas',
        downloadPdf: 'Descargar PDF',
        generatedWith: 'Generado con LinkedIn to CV',
        chatGreeting: "¡Hola! Soy tu Reclutador IA. Estoy aquí para ayudarte a crear tu CV. ¿Empezamos por tu nombre y tu puesto o título profesional actual?"
    },
    'Français': {
        contact: 'Contact',
        summary: 'Profil',
        experience: 'Expérience Professionnelle',
        education: 'Formation',
        certifications: 'Certifications',
        skills: 'Compétences',
        languages: 'Langues',
        downloadPdf: 'Télécharger PDF',
        generatedWith: 'Généré avec LinkedIn to CV',
        chatGreeting: "Bonjour ! Je suis votre Recruteur IA. Je suis là pour vous aider à créer votre CV. Commençons par votre nom et votre poste ou titre professionnel actuel ?"
    },
    'Deutsch': {
        contact: 'Kontakt',
        summary: 'Profil',
        experience: 'Berufserfahrung',
        education: 'Ausbildung',
        certifications: 'Zertifizierungen',
        skills: 'Fähigkeiten',
        languages: 'Sprachen',
        downloadPdf: 'PDF Herunterladen',
        generatedWith: 'Erstellt mit LinkedIn to CV',
        chatGreeting: "Hallo! Ich bin Ihr KI-Recruiter. Ich helfe Ihnen beim Erstellen Ihres Lebenslaufs. Fangen wir mit Ihrem Namen und Ihrem aktuellen Titel oder Rolle an?"
    }
};

export const siteTranslations: Record<Language, {
    nav: {
        features: string;
        templates: string;
        github: string;
    };
    hero: {
        languageLabel: string;
        titleStart: string;
        titleHighlight: string;
        subtitle: string;
        uploadTitle: string;
        uploadDesc: string;
        uploadButton: string;
        noSignup: string;
        inputTooltips: {
            pdf: string;
            text: string;
            chat: string;
        };
    };
    features: {
        aiTitle: string;
        aiDesc: string;
        templatesTitle: string;
        templatesDesc: string;
        smartTitle: string;
        smartDesc: string;
    };
    templates: {
        title: string;
        subtitle: string;
        preview: string;
        t1Style: string;
        t2Style: string;
        t3Style: string;
        t4Style: string;
    };
    editor: {
        badge: string;
        backToHome: string;
        exportPdf: string;
        sourceFile: string;
        changePdf: string;
        cvLanguage: string;
        profilePhoto: string;
        changePhoto: string;
        uploadPhoto: string;
        template: string;
        editContent: string;
        analyzing: string;
        analyzingSub: string;
        loading: string;
        error: string;
    };
    footer: {
        rights: string;
    }
}> = {
    'Italiano': {
        nav: {
            features: 'Funzionalità',
            templates: 'Modelli',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Lingua Sito e CV:',
            titleStart: 'Trasforma la tua Storia Professionale in un',
            titleHighlight: 'CV Vincente',
            subtitle: 'Smetti di lottare con la formattazione. Usa il tuo CV esistente, appunti o chatta con la nostra IA per creare un curriculum perfetto.',
            uploadTitle: 'CV / PDF LinkedIn',
            uploadDesc: 'Trascina o Clicca per Scegliere',
            uploadButton: 'Genera Curriculum',
            noSignup: 'Nessuna registrazione • Gratis • NO ADS • Privacy garantita',
            inputTooltips: {
                pdf: 'Carica il tuo attuale CV o il profilo LinkedIn esportato in PDF. Estarremo automaticamente i dati.',
                text: 'Incolla la tua esperienza lavorativa, formazione e skills in un file .txt semplice.',
                chat: 'Parla con la nostra IA per costruire il CV passo passo rispondendo a semplici domande.'
            }
        },
        features: {
            aiTitle: 'Estrazione IA',
            aiDesc: "Usiamo l'IA Google Gemini per analizzare intelligentemente le descrizioni del lavoro e ottimizzarle per chiarezza e impatto.",
            templatesTitle: 'Template Professionali',
            templatesDesc: 'Scegli tra 4 modelli raffinati e creati da designer che gestiscono automaticamente interruzioni di pagina e layout.',
            smartTitle: 'Ottimizzazione Smart',
            smartDesc: 'Classifica automaticamente le competenze, traduce i contenuti e formatta l\'esperienza usando il metodo STAR.'
        },
        templates: {
            title: 'Design Stupendi',
            subtitle: 'Scegli tra una varietà di layout professionali',
            preview: 'Anteprima',
            t1Style: 'Sidebar Scura a Sinistra',
            t2Style: 'Sidebar Blu a Destra',
            t3Style: 'Header e Sidebar Blu',
            t4Style: 'Header Nero e Timeline'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Torna alla Home',
            exportPdf: 'Esporta PDF',
            sourceFile: 'File Sorgente',
            changePdf: 'Cambia PDF',
            cvLanguage: 'Lingua CV',
            profilePhoto: 'Foto Profilo',
            changePhoto: 'Cambia Foto',
            uploadPhoto: 'Carica Foto',
            template: 'Modello',
            editContent: 'Modifica Contenuti',
            analyzing: 'Analisi Profilo...',
            analyzingSub: 'L\'IA Gemini sta creando il tuo nuovo CV',
            loading: 'Caricamento...',
            error: 'Ops! Qualcosa è andato storto. Riprova.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Progetto Open Source.'
        }
    },
    'English': {
        nav: {
            features: 'Features',
            templates: 'Templates',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Site & CV Language:',
            titleStart: 'Transform your Professional History into a',
            titleHighlight: 'Winning CV',
            subtitle: 'Stop fighting with formatting. Use your existing CV, notes, or chat with AI to create a stunning, ATS-optimized resume in seconds.',
            uploadTitle: 'CV / LinkedIn PDF',
            uploadDesc: 'Drag & Drop or Click to Browse',
            uploadButton: 'Generate Resume',
            noSignup: 'No sign-up required • Free to use • NO ADS • Privacy focused',
            inputTooltips: {
                pdf: 'Upload your current resume or LinkedIn profile export. We will automatically extract the data.',
                text: 'Paste your work experience, education, and skills into a simple .txt file.',
                chat: 'Chat with our AI to build your CV step-by-step by answering simple questions.'
            }
        },
        features: {
            aiTitle: 'AI-Powered Extraction',
            aiDesc: 'We use Google\'s Gemini AI to intelligently analyze job descriptions and optimize them for clarity and impact.',
            templatesTitle: 'Professional Templates',
            templatesDesc: 'Choose from 4 polished, designer-crafted templates that automatically handle page breaks and layout perfectly.',
            smartTitle: 'Smart Optimization',
            smartDesc: 'Automatically ranks skills, translates content, and formats experience using the STAR method for maximum ATS visibility.'
        },
        templates: {
            title: 'Stunning Designs',
            subtitle: 'Choose from a variety of professional layouts',
            preview: 'Preview',
            t1Style: 'Dark Sidebar Left',
            t2Style: 'Navy Sidebar Right',
            t3Style: 'Blue Header & Sidebar',
            t4Style: 'Black Header & Timeline'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Back to Home',
            exportPdf: 'Export PDF',
            sourceFile: 'Source File',
            changePdf: 'Change PDF',
            cvLanguage: 'CV Language',
            profilePhoto: 'Profile Photo',
            changePhoto: 'Change Photo',
            uploadPhoto: 'Upload Photo',
            template: 'Template',
            editContent: 'Edit Content',
            analyzing: 'Analyzing Profile...',
            analyzingSub: 'Gemini AI is crafting your new CV',
            loading: 'Loading...',
            error: 'Failed to process the PDF. Please try again.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Open Source Project.'
        }
    },
    'Español': {
        nav: {
            features: 'Características',
            templates: 'Plantillas',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Idioma Sitio y CV:',
            titleStart: 'Transforma tu Historia Profesional en un',
            titleHighlight: 'CV Ganador',
            subtitle: 'Deja de luchar con el formato. Usa tu CV actual, notas o chatea con la IA para crear un currículum impresionante en segundos.',
            uploadTitle: 'CV / PDF LinkedIn',
            uploadDesc: 'Arrastra y suelta o haz clic para buscar',
            uploadButton: 'Generar Currículum',
            noSignup: 'Sin registro • Gratis • NO ADS • Privacidad garantizada',
            inputTooltips: {
                pdf: 'Sube tu currículum actual o la exportación de tu perfil de LinkedIn. Extraeremos los datos automáticamente.',
                text: 'Pega tu experiencia laboral, educación y habilidades en un archivo .txt simple.',
                chat: 'Chatea con nuestra IA para construir tu CV paso a paso respondiendo preguntas sencillas.'
            }
        },
        features: {
            aiTitle: 'Extracción por IA',
            aiDesc: 'Usamos la IA Google Gemini para analizar inteligentemente las descripciones de trabajo y optimizarlas para claridad e impacto.',
            templatesTitle: 'Plantillas Profesionales',
            templatesDesc: 'Elige entre 4 plantillas pulidas y diseñadas profesionalmente que manejan automáticamente los saltos de página y el diseño.',
            smartTitle: 'Optimización Inteligente',
            smartDesc: 'Clasifica automáticamente habilidades, traduce contenido y formatea la experiencia usando el método STAR.'
        },
        templates: {
            title: 'Diseños Impresionantes',
            subtitle: 'Elige entre una variedad de diseños profesionales',
            preview: 'Vista Previa',
            t1Style: 'Barra Lateral Oscura Izquierda',
            t2Style: 'Barra Lateral Azul Derecha',
            t3Style: 'Encabezado y Barra Azul',
            t4Style: 'Encabezado Negro y Cronología'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Volver al Inicio',
            exportPdf: 'Exportar PDF',
            sourceFile: 'Archivo Fuente',
            changePdf: 'Cambiar PDF',
            cvLanguage: 'Idioma del CV',
            profilePhoto: 'Foto de Perfil',
            changePhoto: 'Cambiar Foto',
            uploadPhoto: 'Subir Foto',
            template: 'Plantilla',
            editContent: 'Editar Contenido',
            analyzing: 'Analizando Perfil...',
            analyzingSub: 'La IA Gemini está creando tu nuevo CV',
            loading: 'Cargando...',
            error: 'Error al procesar el PDF. Inténtalo de nuevo.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Proyecto de Código Abierto.'
        }
    },
    'Français': {
        nav: {
            features: 'Fonctionnalités',
            templates: 'Modèles',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Langue Site et CV:',
            titleStart: 'Transformez votre Parcours Pro en un',
            titleHighlight: 'CV Gagnant',
            subtitle: 'Arrêtez de vous battre avec le formatage. Utilisez votre CV actuel, des notes ou discutez avec l\'IA pour créer un CV époustouflant.',
            uploadTitle: 'CV / PDF LinkedIn',
            uploadDesc: 'Glisser-déposer ou cliquer pour parcourir',
            uploadButton: 'Générer CV',
            noSignup: 'Pas d\'inscription • Gratuit • NO ADS • Confidentialité',
            inputTooltips: {
                pdf: 'Téléchargez votre CV actuel ou l\'exportation de votre profil LinkedIn. Nous extrairons automatiquement les données.',
                text: 'Collez votre expérience professionnelle, votre formation et vos compétences dans un simple fichier .txt.',
                chat: 'Discutez avec notre IA pour construire votre CV étape par étape en répondant à des questions simples.'
            }
        },
        features: {
            aiTitle: 'Extraction par IA',
            aiDesc: 'Nous utilisons l\'IA Google Gemini pour analyser intelligemment les descriptions de poste et les optimiser.',
            templatesTitle: 'Modèles Professionnels',
            templatesDesc: 'Choisissez parmi 4 modèles soignés qui gèrent automatiquement les sauts de page et la mise en page.',
            smartTitle: 'Optimisation Intelligente',
            smartDesc: 'Classe automatiquement les compétences, traduit le contenu et formate l\'expérience avec la méthode STAR.'
        },
        templates: {
            title: 'Designs Époustouflants',
            subtitle: 'Choisissez parmi une variété de mises en page professionnelles',
            preview: 'Aperçu',
            t1Style: 'Barre Latérale Foncée Gauche',
            t2Style: 'Barre Latérale Bleue Droite',
            t3Style: 'En-tête et Barre Bleus',
            t4Style: 'En-tête Noir et Chronologie'
        },
        editor: {
            badge: 'ÉDITEUR',
            backToHome: 'Retour à l\'Accueil',
            exportPdf: 'Exporter PDF',
            sourceFile: 'Fichier Source',
            changePdf: 'Changer PDF',
            cvLanguage: 'Langue du CV',
            profilePhoto: 'Photo de Profil',
            changePhoto: 'Changer Photo',
            uploadPhoto: 'Télécharger Photo',
            template: 'Modèle',
            editContent: 'Modifier Contenu',
            analyzing: 'Analyse du Profil...',
            analyzingSub: 'L\'IA Gemini crée votre nouveau CV',
            loading: 'Chargement...',
            error: 'Échec du traitement du PDF. Réessayez.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Projet Open Source.'
        }
    },
    'Deutsch': {
        nav: {
            features: 'Funktionen',
            templates: 'Vorlagen',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Sprache:',
            titleStart: 'Verwandeln Sie Ihre Berufserfahrung in einen',
            titleHighlight: 'Gewinner-CV',
            subtitle: 'Schluss mit Formatierungskämpfen. Nutzen Sie Ihren aktuellen CV, Notizen oder chatten Sie mit der KI.',
            uploadTitle: 'CV / LinkedIn PDF',
            uploadDesc: 'Drag & Drop oder Klicken zum Durchsuchen',
            uploadButton: 'Lebenslauf Erstellen',
            noSignup: 'Keine Anmeldung • Kostenlos • NO ADS • Datenschutz',
            inputTooltips: {
                pdf: 'Laden Sie Ihren aktuellen Lebenslauf oder Ihr LinkedIn-Profil hoch. Wir extrahieren die Daten automatisch.',
                text: 'Fügen Sie Ihre Berufserfahrung, Ausbildung und Fähigkeiten in eine einfache .txt-Datei ein.',
                chat: 'Chatten Sie mit unserer KI, um Ihren Lebenslauf Schritt für Schritt zu erstellen.'
            }
        },
        features: {
            aiTitle: 'KI-Extraktion',
            aiDesc: 'Wir nutzen Google Gemini AI, um Jobbeschreibungen intelligent zu analysieren und für Klarheit zu optimieren.',
            templatesTitle: 'Profi-Vorlagen',
            templatesDesc: 'Wählen Sie aus 4 polierten Vorlagen, die Seitenumbrüche und Layout automatisch perfekt handhaben.',
            smartTitle: 'Smarte Optimierung',
            smartDesc: 'Ordnet Fähigkeiten automatisch, übersetzt Inhalte und formatiert Erfahrungen mit der STAR-Methode.'
        },
        templates: {
            title: 'Tolle Designs',
            subtitle: 'Wählen Sie aus verschiedenen professionellen Layouts',
            preview: 'Vorschau',
            t1Style: 'Dunkle Seitenleiste Links',
            t2Style: 'Blaue Seitenleiste Rechts',
            t3Style: 'Blauer Header & Leiste',
            t4Style: 'Schwarzer Header & Timeline'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Zurück zur Startseite',
            exportPdf: 'PDF Exportieren',
            sourceFile: 'Quelldatei',
            changePdf: 'PDF Ändern',
            cvLanguage: 'CV Sprache',
            profilePhoto: 'Profilfoto',
            changePhoto: 'Foto Ändern',
            uploadPhoto: 'Foto Hochladen',
            template: 'Vorlage',
            editContent: 'Inhalt Bearbeiten',
            analyzing: 'Profil wird analysiert...',
            analyzingSub: 'Gemini AI erstellt Ihren neuen CV',
            loading: 'Laden...',
            error: 'Fehler beim Verarbeiten. Bitte erneut versuchen.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Open Source Projekt.'
        }
    }
};
