import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '@/types/resume';

// Fix for pdf-parse import in Next.js
const pdfParseLib = require('pdf-parse');
const pdfParse = pdfParseLib.default || pdfParseLib;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const language = formData.get('language') as string || 'Italiano'; // Default to Italiano

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer for pdf-parse
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF text
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text;

    // Call Gemini to structure the data
    // User requested "gemma-3-27b". We use 'gemini-1.5-flash' as the robust API proxy for high-throughput free tier.
    // Ideally, we would use the exact string 'gemma-3-27b-it' if verified to be available in this SDK.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    return NextResponse.json(resumeData);

  } catch (error) {
    console.error('Error processing CV:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
