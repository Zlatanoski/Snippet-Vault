export type Language = 'ts' | 'py' | 'sh' | 'sql' | 'js' | 'css' | 'json';

export interface Snippet {
    id: string;
    title: string;
    language: Language;
    preview: string;
    description?: string;
    tags: string[];
    updatedAt: string;
}

export interface NavItem {
    id: string;
    label: string;
    count: number;
    icon: 'all' | 'favourites' | 'private';
}

export interface Tag {
    id: string;
    label: string;
    color: string;
    count: number;
}