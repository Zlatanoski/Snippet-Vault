import type { Snippet, NavItem, Tag } from './types';

export const SNIPPETS: Snippet[] = [
    {
        id: '1',
        title: 'useDebounce hook',
        language: 'ts',
        preview: "export function useDebounce<T>(value: T, delay: number)...",
        tags: ['react', 'hooks', 'utils'],
    },
    {
        id: '2',
        title: 'Flatten nested dict',
        language: 'py',
        preview: "def flatten(d, parent_key='', sep='_'): items = []...",
        tags: ['python', 'utils'],
    },
    {
        id: '3',
        title: 'Docker cleanup all',
        language: 'sh',
        preview: 'docker system prune -a --volumes --force',
        tags: ['docker', 'devops'],
    },
    {
        id: '4',
        title: 'Paginate with offset',
        language: 'sql',
        preview: 'SELECT * FROM table ORDER BY id LIMIT $1 OFFSET $2',
        tags: ['db', 'postgres'],
    },
    {
        id: '5',
        title: 'JWT verify middleware',
        language: 'ts',
        preview: 'export const authMiddleware = async (c: Context, next...',
        tags: ['auth', 'hono'],
    },
];

export const NAV_ITEMS: NavItem[] = [
    { id: 'all',        label: 'All snippets', count: 24, icon: 'all' },
    { id: 'favourites', label: 'Favourites',   count: 6,  icon: 'favourites' },
    { id: 'private',    label: 'Private',      count: 3,  icon: 'private' },
];

export const TAGS: Tag[] = [
    { id: 'react', label: 'react', color: '#378add', count: 8 },
    { id: 'utils', label: 'utils', color: '#1d9e75', count: 5 },
    { id: 'auth',  label: 'auth',  color: '#7f77dd', count: 4 },
    { id: 'db',    label: 'db',    color: '#ba7517', count: 7 },
];