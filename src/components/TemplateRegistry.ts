import { ResumeData } from '@/types/resume';
import { MinimalWeb } from './templates/MinimalWeb';
import { ModernWeb } from './templates/ModernWeb';
import { MinimalPdf } from './templates/MinimalPdf';
import { ModernPdf } from './templates/ModernPdf';
import { Language } from '@/utils/translations';

export interface TemplateConfig {
    id: string;
    name: string;
    styles: string;
    Web: React.FC<{ data: ResumeData; profileImage?: string; language: Language }>;
    Pdf: React.FC<{ data: ResumeData; profileImage?: string; language: Language }>;
    thumbnail: string;
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
    }
];

export const getTemplate = (id: string) => templates.find(t => t.id === id) || templates[0];
