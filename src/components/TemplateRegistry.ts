import { ResumeData } from '@/types/resume';
import { Template1Web } from './templates/Template1Web';
import { Template1Pdf } from './templates/Template1Pdf';
import { Template2Web } from './templates/Template2Web';
import { Template2Pdf } from './templates/Template2Pdf';
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
    styles: 'Dark Sidebar Left',
    Web: Template1Web,
    Pdf: Template1Pdf,
    thumbnail: 'bg-[#4A5568]',
  },
  {
    id: 'template2',
    name: 'Template 2',
    styles: 'Navy Sidebar Right',
    Web: Template2Web,
    Pdf: Template2Pdf,
    thumbnail: 'bg-[#2C3E50]',
  },
  {
    id: 'template3',
    name: 'Template 3',
    styles: 'Light Blue Header',
    Web: Template3Web,
    Pdf: Template3Pdf,
    thumbnail: 'bg-[#B8D4E8]',
  },
  {
    id: 'template4',
    name: 'Template 4',
    styles: 'Black Header Right',
    Web: Template4Web,
    Pdf: Template4Pdf,
    thumbnail: 'bg-[#1F2937]',
  }
];

export const getTemplate = (id: string) => templates.find(t => t.id === id) || templates[0];
