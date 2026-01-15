const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Try to read .env.local
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1]] = match[2];
            }
        });
    }
} catch (e) {
    console.log('Error reading .env.local', e);
}

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API KEY found in process.env or .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // For some reason the Node SDK might not expose listModels directly on the main class easily in all versions, 
        // but let's try the model manager if it exists, or a direct HTTP call if needed.
        // Actually, creating a model doesn't help us list them. The SDK usually doesn't have a listModels helper 
        // directly exposed in the high-level `genAI` object in earlier versions, but let's check.
        // According to docs, we might need to use the API directly or check if newer SDK has it.

        // Let's rely on a direct fetch to be sure, as it mimics what the user needs.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name} (${m.displayName})`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
