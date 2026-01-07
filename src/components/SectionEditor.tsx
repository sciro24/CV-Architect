'use client';

import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { ResumeData, Skill, Certification } from '@/types/resume';

interface SectionEditorProps {
    data: ResumeData;
    onUpdate: (newData: ResumeData) => void;
}

const SortableItem = ({ id, content, visible, onToggle }: { id: string; content: string; visible: boolean; onToggle: () => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: visible ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style} className={`flex items-center gap-3 bg-white p-3 rounded-md border ${visible ? 'border-gray-200' : 'border-gray-100 bg-gray-50'} shadow-sm mb-2 group`}>
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                <GripVertical size={16} />
            </div>
            <div className={`flex-1 text-sm ${!visible && 'line-through text-gray-400'}`}>{content}</div>
            <button onClick={onToggle} className="text-gray-400 hover:text-blue-500 transition-colors">
                {visible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
        </div>
    );
};

export const SectionEditor: React.FC<SectionEditorProps> = ({ data, onUpdate }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle Skills
    const handleDragEndSkills = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = data.skills.findIndex(s => s.name === active.id);
            const newIndex = data.skills.findIndex(s => s.name === over.id);
            const newSkills = arrayMove(data.skills, oldIndex, newIndex);
            onUpdate({ ...data, skills: newSkills });
        }
    };

    const toggleSkill = (skillName: string) => {
        const newSkills = data.skills.map(s =>
            s.name === skillName ? { ...s, visible: !s.visible } : s
        );
        onUpdate({ ...data, skills: newSkills });
    };

    // Handle Certifications
    const handleDragEndCerts = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = data.certifications.findIndex(c => c.name === active.id);
            const newIndex = data.certifications.findIndex(c => c.name === over.id);
            const newCerts = arrayMove(data.certifications, oldIndex, newIndex);
            onUpdate({ ...data, certifications: newCerts });
        }
    };

    const toggleCert = (certName: string) => {
        const newCerts = data.certifications.map(c =>
            c.name === certName ? { ...c, visible: !c.visible } : c
        );
        onUpdate({ ...data, certifications: newCerts });
    };

    const handleDragEndLanguages = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = data.languages.indexOf(active.id);
            const newIndex = data.languages.indexOf(over.id);
            const newLangs = arrayMove(data.languages, oldIndex, newIndex);
            onUpdate({ ...data, languages: newLangs });
        }
    };

    return (
        <div className="p-4 space-y-8">
            <div>
                <h3 className="font-bold text-gray-700 mb-3 flex justify-between items-center">
                    Skills
                    <span className="text-xs font-normal text-gray-400">Toggle / Drag</span>
                </h3>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSkills}>
                    <SortableContext items={data.skills.map(s => s.name)} strategy={verticalListSortingStrategy}>
                        {data.skills.map((skill) => (
                            <SortableItem
                                key={skill.name}
                                id={skill.name}
                                content={skill.name}
                                visible={skill.visible}
                                onToggle={() => toggleSkill(skill.name)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            {data.certifications && data.certifications.length > 0 && (
                <div>
                    <h3 className="font-bold text-gray-700 mb-3 flex justify-between items-center">
                        Certifications
                        <span className="text-xs font-normal text-gray-400">Toggle / Drag</span>
                    </h3>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndCerts}>
                        <SortableContext items={data.certifications.map(c => c.name)} strategy={verticalListSortingStrategy}>
                            {data.certifications.map((cert) => (
                                <SortableItem
                                    key={cert.name}
                                    id={cert.name}
                                    content={cert.name}
                                    visible={cert.visible}
                                    onToggle={() => toggleCert(cert.name)}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            )}

            <div>
                <h3 className="font-bold text-gray-700 mb-3 flex justify-between items-center">
                    Languages
                    <span className="text-xs font-normal text-gray-400">Drag to reorder</span>
                </h3>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLanguages}>
                    <SortableContext items={data.languages} strategy={verticalListSortingStrategy}>
                        {data.languages.map((lang) => (
                            <div key={lang} className="flex items-center gap-3 bg-white p-3 rounded-md border border-gray-200 shadow-sm mb-2">
                                <span className="text-sm">{lang}</span>
                            </div>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
