import { ResumeData } from '@/types/resume';
import { MinimalWeb } from './templates/MinimalWeb';
import { ModernWeb } from './templates/ModernWeb';
import { MinimalPdf } from './templates/MinimalPdf';
import { ModernPdf } from './templates/ModernPdf';

// We will add the other 4 templates here as we create them
// For now, mapping the existing ones and placeholders

export interface TemplateConfig {
    id: string;
    name: string;
    styles: string;
    Web: React.FC<{ data: ResumeData; profileImage?: string }>;
    Pdf: React.FC<{ data: ResumeData; profileImage?: string }>;
    thumbnail: string; // Color code or image path
}

export const templates: TemplateConfig[] = [
    {
        id: 'minimal',
        name: 'Minimal Clean',
        styles: 'Simple and effective',
        Web: MinimalWeb,
        Pdf: MinimalPdf,
        thumbnail: 'bg-gray-100',
    },
    {
        id: 'modern',
        name: 'Modern Dark',
        styles: 'Bold sidebar design',
        Web: ModernWeb,
        Pdf: ModernPdf,
        thumbnail: 'bg-slate-800',
    },
    // Future templates (3, 4, 5, 6) will be added here
    {
        id: 'classic',
        name: 'Classic Professional',
        styles: 'Traditional layout',
        Web: MinimalWeb, // Placeholder
        Pdf: MinimalPdf, // Placeholder
        thumbnail: 'bg-blue-50',
    },
    {
        id: 'creative',
        name: 'Creative',
        styles: 'Colorful header',
        Web: ModernWeb, // Placeholder
        Pdf: ModernPdf, // Placeholder
        thumbnail: 'bg-purple-100',
    },
    {
        id: 'tech',
        name: 'Tech Resume',
        styles: 'Skills focused',
        Web: MinimalWeb, // Placeholder
        Pdf: MinimalPdf, // Placeholder
        thumbnail: 'bg-green-50',
    },
    {
        id: 'executive',
        name: 'Executive',
        styles: 'High level overview',
        Web: ModernWeb, // Placeholder
        Pdf: ModernPdf, // Placeholder
        thumbnail: 'bg-gray-800',
    }
];

export const getTemplate = (id: string) => templates.find(t => t.id === id) || templates[0];
