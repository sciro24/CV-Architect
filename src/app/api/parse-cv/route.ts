import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '@/types/resume';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const language = formData.get('language') as string || 'Italiano';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer 
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamic import for pdf-parse to avoid top-level bundling issues with Next.js App Router
    let pdfParse: any;
    try {
      const pdfParseModule = await import('pdf-parse');
      pdfParse = pdfParseModule.default || pdfParseModule; // Handle ESM/CJS interop

      // Double check it's a function
      if (typeof pdfParse !== 'function') {
        // Some bundlers nest it deeply, check default.default just in case
        if (typeof (pdfParse as any).default === 'function') {
          pdfParse = (pdfParse as any).default;
        }
      }
    } catch (importError) {
      console.error('Failed to load pdf-parse module dynamically:', importError);
      throw new Error('Server Configuration Error: PDF Parser could not be loaded.');
    }

    if (typeof pdfParse !== 'function') {
      console.error('pdf-parse loaded as:', typeof pdfParse, pdfParse);
      throw new Error('PDF Parser library initialization failed (not a function).');
    }

    // Parse PDF text
    let text = '';
    try {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } catch (pdfError) {
      console.error('Error parsing PDF content:', pdfError);
      throw new Error('Failed to read PDF file content. Ensure it is a valid PDF.');
    }

    if (!text || text.length < 50) {
      throw new Error('Could not extract enough text from PDF. It might be image-based or empty.');
    }

    // Call Gemini
    // Call Gemini
    // Using gemma-3-27b-it as requested (or gemma-3-27b if it is the precise string)
    const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

    const systemPrompt = `Sei un esperto HR specializzato in ottimizzazione CV per sistemi ATS (Applicant Tracking Systems).

**OBIETTIVO CRITICO**: Generare un CV che stia in UNA SOLA PAGINA A4 (massimo 800 parole totali).

**REGOLE DI TRADUZIONE**:
1. Traduci TUTTO il contenuto descrittivo (Summary, Descrizioni lavori, Skills) in: **${language}**
2. NON tradurre: Nomi Aziende, Nomi Scuole/Università, Nomi Certificazioni
3. Usa verbi d'azione e metodo STAR (Situation-Task-Action-Result) ma sii ESTREMAMENTE conciso

**LIMITI DI LUNGHEZZA (RISPETTA RIGOROSAMENTE)**:
- Summary: max 200 caratteri
- Work Experience: max 3 posizioni più recenti/rilevanti
  - Per ogni posizione: max 2 bullet points (max 100 caratteri ciascuno)
- Education: max 2 titoli principali
- Skills: max 12-15 competenze TOTALI (ordinate per rilevanza ATS)
- Languages: max 4 lingue
- Certifications: max 5 certificazioni più rilevanti

**SKILLS - IMPORTANTE**: 
- Ordina le skills dalla PIÙ RILEVANTE alla MENO RILEVANTE per il profilo professionale
- Le prime 4-5 skills devono essere le più importanti per sistemi ATS
- Includi mix di: hard skills tecniche, soft skills, tools/software

**CERTIFICATIONS**:
- Estrai certificazioni professionali, corsi rilevanti, licenze
- Ordina per rilevanza/prestigio

Struttura JSON richiesta:
    {
      "personal_info": {
        "fullName": "Name Surname",
        "email": "email@example.com",
        "phone": "+123...",
        "location": "City, Country",
        "linkedinUrl": "https://linkedin.com/in/...",
        "portfolioUrl": "https://...",
        "summary": "Professional summary..."
      },
      "work_experience": [
        {
          "title": "Job Title",
          "company": "Company Name",
          "location": "Location",
          "startDate": "MMM YYYY",
          "endDate": "MMM YYYY or Present",
          "description": ["Action verb + task + result (STAR method point 1)", "Point 2..."]
        }
      ],
      "education": [
        {
          "degree": "Degree Name",
          "school": "School Name",
          "location": "Location",
          "startDate": "YYYY",
          "endDate": "YYYY"
        }
      ],
      "skills": ["Skill 1", "Skill 2"],
      "languages": ["Language 1", "Language 2"],
      "certifications": ["Cert 1", "Cert 2"]
    }
    
    Non includere markdown o backticks. Restituisci solo il raw JSON.`;

    const result = await model.generateContent([systemPrompt, text.slice(0, 30000)]);
    const response = await result.response;
    const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

    let resumeData: ResumeData;
    try {
      const rawData = JSON.parse(jsonString);

      // Transform skills: first 5 are visible (most important from AI), rest hidden
      // Transform certifications: first 3 visible
      resumeData = {
        ...rawData,
        skills: Array.isArray(rawData.skills)
          ? rawData.skills.map((s: string | any, index: number) =>
            typeof s === 'string' ? { name: s, visible: index < 5 } : s)
          : [],
        certifications: Array.isArray(rawData.certifications)
          ? rawData.certifications.map((c: string | any, index: number) =>
            typeof c === 'string' ? { name: c, visible: index < 3 } : c)
          : []
      };

    } catch (e) {
      console.error("Failed to parse JSON from AI response:", jsonString);
      return NextResponse.json({ error: 'Failed to parse AI response. The model output was not valid JSON.' }, { status: 500 });
    }

    return NextResponse.json(resumeData);

  } catch (error) {
    console.error('Error processing CV:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
