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

    const systemPrompt = `Sei un esperto di recruiting; estrai i dati dal testo LinkedIn e restituisci SOLO un oggetto JSON con chiavi personal_info, work_experience, education, skills, languages, ottimizzando i contenuti con il metodo STAR e verbi d'azione nella lingua selezionata dall'utente: ${language}.
    
    Assicurati che il JSON rispetti strettamente questa struttura e non inventare dati se non presenti:
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
      "languages": ["Language 1", "Language 2"]
    }
    
    Non includere markdown o backticks. Restituisci solo il raw JSON.`;

    const result = await model.generateContent([systemPrompt, text.slice(0, 30000)]);
    const response = await result.response;
    const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

    let resumeData: ResumeData;
    try {
      resumeData = JSON.parse(jsonString);
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
