
export interface ProficiencyData {
    text: string;
    name: string; // Cleaned name without proficiency
    percentage: number;
    label: string; // e.g. "Native", "Fluent", "Basic"
}

export function getLanguageProficiency(languageString: string): ProficiencyData {
    const lower = languageString.toLowerCase();

    let percentage = 60; // Default Intermediate
    let label = '';

    // Calculate Percentage & Label
    if (lower.match(/(native|madrelingua|mother tongue|muttersprache|nativo|langue maternelle)/)) {
        percentage = 100;
        label = 'Native';
    } else if (lower.match(/(fluent|proficient|c2|c1|avanzato|fluente|courant|verhandlungssicher)/)) {
        percentage = 90;
        label = 'Fluent';
    } else if (lower.match(/(intermediate|b2|b1|intermedio|intermédiaire|fließend)/)) {
        percentage = 70;
        label = 'Intermediate';
    } else if (lower.match(/(basic|beginner|elementary|a2|a1|base|débutant|grundkenntnisse)/)) {
        percentage = 40;
        label = 'Basic';
    }

    // Clean Name: Remove content in parentheses or after specific separators often used for proficiency
    // Example: "Italian (Native or Bilingual Proficiency)" -> "Italian"
    // Example: "English - Fluent" -> "English"
    let name = languageString.replace(/\s*\(.*?\)|-.*$/g, '').trim();

    // If the replace resulted in empty string (unlikely but possible if input was just "(Native)"), fallback
    if (!name) name = languageString;

    return {
        text: languageString,
        name,
        percentage,
        label
    };
}
