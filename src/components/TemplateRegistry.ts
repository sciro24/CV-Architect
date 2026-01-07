import { ResumeData } from '@/types/resume';
import { MinimalWeb } from './templates/MinimalWeb';
import { ModernWeb } from './templates/ModernWeb';
import { MinimalPdf } from './templates/MinimalPdf';
import { ModernPdf } from './templates/ModernPdf';
import { Template3Web } from './templates/Template3Web';
import { Template3Pdf } from './templates/Template3Pdf';
import { Template4Web } from './templates/Template4Web';
import { Template4Pdf } from './templates/Template4Pdf';
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
        id: 'template1',
        name: 'Template 1',
        styles: 'Minimal & Clean',
        Web: MinimalWeb,
        Pdf: MinimalPdf,
        thumbnail: 'bg-gray-100',
    },
    {
        id: 'template2',
        name: 'Template 2',
        styles: 'Modern Dark',
        Web: ModernWeb,
        Pdf: ModernPdf,
        thumbnail: 'bg-slate-800',
    },
    {
        id: 'template3',
        name: 'Template 3',
        styles: 'Professional Blue',
        Web: Template3Web,
        Pdf: Template3Pdf,
        thumbnail: 'bg-blue-50',
    },
    {
        id: 'template4',
        name: 'Template 4',
        styles: 'Executive Header',
        Web: Template4Web,
        Pdf: Template4Pdf,
        thumbnail: 'bg-gray-700',
    }
];

export const getTemplate = (id: string) => templates.find(t => t.id === id) || templates[0];
