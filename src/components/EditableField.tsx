import React, { useState, useEffect, useRef } from 'react';

interface EditableFieldProps {
    value: string;
    onChange?: (value: string) => void; // Optional because PDF/read-only mode won't pass it
    className?: string;
    style?: React.CSSProperties;
    multiline?: boolean;
    placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, className, style, multiline, placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    if (!onChange) {
        return <span className={className} style={style}>{value}</span>;
    }

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                    className={`bg-transparent outline-none border-b border-gray-400 w-full resize-none ${className}`}
                    style={style}
                    placeholder={placeholder}
                    rows={3}
                />
            );
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`bg-transparent outline-none border-b border-gray-400 min-w-[50px] ${className}`}
                style={style}
                placeholder={placeholder}
            />
        );
    }

    return (
        <span
            onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
            }}
            className={`cursor-text hover:bg-black/5 rounded px-0.5 -mx-0.5 transition-colors ${className}`}
            style={style}
            title="Click to edit"
        >
            {value || <span className="text-gray-400 italic">{placeholder || 'Empty'}</span>}
        </span>
    );
};
