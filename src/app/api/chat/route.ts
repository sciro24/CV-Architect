import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Models to try in order (aligned with the CV parser for consistency)
const MODELS = ['gemma-3-27b-it', 'gemma-3-12b-it'];

export async function POST(req: NextRequest) {
    try {
        const { messages, language } = await req.json();
        const userLanguage = language || 'English'; // Default to English if not provided

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid message history' }, { status: 400 });
        }

        // System instruction to guide the bot
        const systemInstruction = `You are a friendly and professional HR Recruiter Assistant. 
    Your goal is to interview the user to gather all necessary information to build their customized CV.
    If asked who created, designed, or programmed you, you MUST answer that you were created by "Diego Scirocco".
    
    You need to gather:
    1. Personal Info (Name, Current Role or Professional Title, Location, Contacts) if not already known.
    2. Professional Summary (Brief bio).
    3. Work Experience (Company, Role, Dates, Key achievements).
    4. Education (Degree, School, Dates).
    5. Skills (Hard & Soft skills).
    6. Languages.
    7. Certifications (if any).
    
    GUIDELINES:
    - Start the conversation in ${userLanguage}, but if the user replies in another language, switch to that language immediately.
    - Ask ONE or TWO questions at a time. Do not overwhelm the user.
    - Be encouraging and polite.
    - If the user provides a lot of info, summarize it briefly to confirm.
    - Keep your responses concise.
    - IMPORTANT: You cannot generate files or documents. Your ONLY role is to interview the user. When you have enough information, simply say "I have all the information needed." and ask the user to click the "Create CV" button to proceed. NEVER say you will "compile" or "format" the document yourself.`;

        let generatedText = '';
        let lastError;

        // Convert frontend messages to Gemini format
        // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
        // We filter out system messages from history if any, as we send systemInstruction separately if supported, 
        // or prepend it. For this SDK version, we'll try the chat session.

        const formattedHistory = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
        }));

        for (const modelName of MODELS) {
            try {
                console.log(`[Chat API] Attempting with model: ${modelName}`);
                const model = genAI.getGenerativeModel({
                    model: modelName,
                });

                // Ensure history starts with a user message
                let historyMessages = formattedHistory.slice(0, -1);
                let lastMessageText = formattedHistory[formattedHistory.length - 1].parts[0].text;

                // Find first user message in history
                const firstUserIndex = historyMessages.findIndex(m => m.role === 'user');

                if (firstUserIndex !== -1) {
                    historyMessages = historyMessages.slice(firstUserIndex);
                    // Prepend system instruction to the very first user message in history
                    historyMessages[0].parts[0].text = `SYSTEM INSTRUCTION: ${systemInstruction}\n\nUSER MESSAGE: ${historyMessages[0].parts[0].text}`;
                } else {
                    // History is empty or has no user messages. 
                    // Prepend system instruction to the ONLY current message (lastMessageText)
                    historyMessages = [];
                    lastMessageText = `SYSTEM INSTRUCTION: ${systemInstruction}\n\nUSER MESSAGE: ${lastMessageText}`;
                }

                const chat = model.startChat({
                    history: historyMessages,
                });

                const result = await chat.sendMessage(lastMessageText);
                const response = await result.response;
                generatedText = response.text();

                break; // Success
            } catch (e) {
                console.warn(`[Chat API] Model ${modelName} failed:`, e);
                lastError = e;
            }
        }

        if (!generatedText) {
            // Fallback: If chat history format fails or strictly models don't support systemInstruction the same way,
            // we might throw. Let's return error.
            throw lastError || new Error('Failed to generate chat response');
        }

        return NextResponse.json({ role: 'assistant', content: generatedText });

    } catch (error) {
        console.error('[Chat API] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
