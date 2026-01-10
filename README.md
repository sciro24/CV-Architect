# CV Architect

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-sparkles?style=for-the-badge&logo=vercel&color=000000)](https://curriculum-architect.vercel.app/)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**Architect the perfect CV with AI.**

Transform your LinkedIn PDF export into a professional, ATS-optimized, and design-rich Curriculum Vitae in seconds. Powered by Google Gemini AI and built with modern web technologies.

---

## 🔗 Try It Live
🚀 **Experience the app directly in your browser:**  
👉 **[https://curriculum-architect.vercel.app/](https://curriculum-architect.vercel.app/)**

---

## 🌟 Overview

**CV Architect** is an intelligent tool designed to streamline the job application process. By analyzing your LinkedIn profile, it leverages advanced AI to rewrite your experiences using the STAR method, optimizing your content for Applicant Tracking Systems (ATS) while presenting it in a visually stunning layout.

## 🚀 Key Features

### 🤖 Intelligent Core
- **AI Extraction & Optimization**: Uses Google's Gemini AI to parse LinkedIn PDFs and rewrite descriptions for maximum impact.
- **STAR Method Application**: Automatically structures bullet points (Situation, Task, Action, Result) to highlight achievements.
- **ATS Compliance**: Ensures your CV is readable by recruitment software.
- **Multi-Language Support**: Smart translation into Italian, English, Spanish, French, and German while preserving proper nouns.

### 🎨 Professional Design
- **8  Premium Templates**:
- **A4 Optimization**: Content is intelligently summarized to fit perfectly on a single page.
- **Real-Time Preview**: Instant visual feedback as you customize your document.

### ✨ Interactive Customization
- **Smart Visibility**: AI suggests the most relevant skills, but you have full control.
- **Drag & Drop**: Intuitively reorder skills, languages, and certifications.
- **Granular Control**: Toggle visibility for individual items to tailor your CV for specific applications.

---

## 🛠️ Tech Stack

### Frontend Architecture
![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React_19-20232a?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)

- **Engine**: Next.js 16.1.1 (App Router & Turbopack)
- **Styling**: TailwindCSS for utility-first design
- **State & Interaction**: `@dnd-kit` for complex drag-and-drop interfaces
- **PDF Engine**: `@react-pdf/renderer` for robust client-side PDF generation

### Backend & AI
- **Serverless API**: Next.js API Routes
- **Intelligence**: Google Generative AI (Gemini Pro) via `@google/generative-ai`
- **Parsing**: `pdf-parse` for text extraction

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher
- **Gemini API Key**: [Get your key from Google AI Studio](https://makersuite.google.com/app/apikey)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sciro24/CV-Architect.git
   cd CV-Architect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Launch Application**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see the app running.

---

## 📖 How to Use

1. **Export LinkedIn Profile**: Go to your profile -> `More` -> `Save to PDF`.
2. **Upload**: Select your target language and upload the PDF to CV Architect.
3. **Customize**:
   - Select a template that fits your style.
   - Use the "Eye" icons to show/hide specific skills or roles.
   - Drag sections to reorder them based on priority.
4. **Download**: Generate a print-ready PDF with one click.

---

## 🌍 Localization

Fully supported languages for interface and generated content:
- 🇮🇹 Italian
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German

---
*Created by Diego Scirocco*
