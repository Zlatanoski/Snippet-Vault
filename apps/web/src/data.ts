import type { Snippet, NavItem, Tag, Project, Member, Invitation, Collection } from './types';

export const SNIPPETS: Snippet[] = [
    {
        id: '1',
        title: 'useDebounce hook',
        language: 'ts',
        preview: "export function useDebounce<T>(value: T, delay: number)...",
        description: 'Debounces a value by delay ms — useful for search inputs.',
        tags: ['react', 'hooks', 'utils'],
        updatedAt: '2d ago',
    },
    {
        id: '2',
        title: 'Flatten nested dict',
        language: 'py',
        preview: "def flatten(d, parent_key='', sep='_'): items = []...",
        description: 'Recursively flattens a nested dict with dot-separated keys.',
        tags: ['python', 'utils'],
        updatedAt: '5d ago',
    },
    {
        id: '3',
        title: 'Docker cleanup all',
        language: 'sh',
        preview: 'docker system prune -a --volumes --force',
        description: 'Prunes all stopped containers, images, and volumes.',
        tags: ['docker', 'devops'],
        updatedAt: '1w ago',
    },
    {
        id: '4',
        title: 'Paginate with offset',
        language: 'sql',
        preview: 'SELECT * FROM table ORDER BY id LIMIT $1 OFFSET $2',
        description: 'Cursor-style pagination using LIMIT/OFFSET params.',
        tags: ['db', 'postgres'],
        updatedAt: '3d ago',
    },
    {
        id: '5',
        title: 'JWT verify middleware',
        language: 'ts',
        preview: 'export const authMiddleware = async (c: Context, next...',
        description: 'Hono middleware that validates Bearer JWT on each request.',
        tags: ['auth', 'hono'],
        updatedAt: '1d ago',
    },
];

export const NAV_ITEMS: NavItem[] = [
    { id: 'all',         label: 'All snippets', count: 24, icon: 'all'         },
    { id: 'favourites',  label: 'Favourites',   count: 6,  icon: 'favourites'  },
    { id: 'private',     label: 'Private',      count: 3,  icon: 'private'     },
    { id: 'collections', label: 'Collections',  count: 6,  icon: 'collections' },
];

export const COLLECTIONS: Collection[] = [
    { id: '1', name: 'React Patterns',   description: 'Hooks, context and component patterns', count: 8,  updatedAt: '1d ago', color: '#60a5fa' },
    { id: '2', name: 'Database Utils',   description: 'SQL helpers and ORM utilities',          count: 12, updatedAt: '2d ago', color: '#f87171' },
    { id: '3', name: 'Auth Patterns',    description: 'JWT, OAuth, session management',         count: 6,  updatedAt: '1w ago', color: '#a78bfa' },
    { id: '4', name: 'API Templates',    description: 'Reusable API endpoint patterns',          count: 4,  updatedAt: '3d ago', color: '#34d399' },
    { id: '5', name: 'Docker & DevOps',  description: 'Container management scripts',           count: 9,  updatedAt: '4d ago', color: '#fb923c' },
    { id: '6', name: 'TypeScript Utils', description: 'Type helpers and generics',              count: 7,  updatedAt: '1d ago', color: '#818cf8' },
];

export const TAGS: Tag[] = [
    { id: 'react', label: 'react', color: '#378add', count: 8 },
    { id: 'utils', label: 'utils', color: '#1d9e75', count: 5 },
    { id: 'auth',  label: 'auth',  color: '#7f77dd', count: 4 },
    { id: 'db',    label: 'db',    color: '#ba7517', count: 7 },
];

export const PROJECTS: Project[] = [
    { id: 'proj-1', name: 'React Dashboard', color: '#60a5fa' },
    { id: 'proj-2', name: 'API Backend',      color: '#34d399' },
    { id: 'proj-3', name: 'DevOps Scripts',   color: '#fb923c' },
];

export const PROJECT_MEMBERS: Record<string, Member[]> = {
    'proj-1': [
        { id: '1', name: 'Zlatanoski',   handle: '@zlatanoski', initials: 'ZO', color: '#6366f1', role: 'Owner',  joined: 'Jan 2025', snippets: 24, online: true  },
        { id: '2', name: 'Sarah Chen',   handle: '@sarahc',     initials: 'SC', color: '#60a5fa', role: 'Editor', joined: 'Feb 2025', snippets: 11, online: true  },
        { id: '3', name: 'Arjun Patel',  handle: '@arjunp',     initials: 'AP', color: '#f59e0b', role: 'Editor', joined: 'Mar 2025', snippets: 7,  online: false },
        { id: '4', name: 'Mia Hoffmann', handle: '@miah',       initials: 'MH', color: '#34d399', role: 'Viewer', joined: 'Apr 2025', snippets: 0,  online: false },
    ],
    'proj-2': [
        { id: '1', name: 'Zlatanoski', handle: '@zlatanoski', initials: 'ZO', color: '#6366f1', role: 'Owner',  joined: 'Dec 2024', snippets: 12, online: true  },
        { id: '2', name: 'Lena Park',  handle: '@lenapark',   initials: 'LP', color: '#a78bfa', role: 'Editor', joined: 'Jan 2025', snippets: 9,  online: false },
    ],
    'proj-3': [
        { id: '1', name: 'Zlatanoski',  handle: '@zlatanoski', initials: 'ZO', color: '#6366f1', role: 'Owner',  joined: 'Nov 2024', snippets: 9,  online: true  },
        { id: '2', name: 'Arjun Patel', handle: '@arjunp',     initials: 'AP', color: '#f59e0b', role: 'Editor', joined: 'Dec 2024', snippets: 5,  online: true  },
        { id: '3', name: 'Omar Hassan', handle: '@omarh',       initials: 'OH', color: '#fb923c', role: 'Viewer', joined: 'Mar 2025', snippets: 2,  online: false },
    ],
};

export const INVITATIONS: Invitation[] = [
    { id: '1', project: 'Frontend Monorepo', projectColor: '#60a5fa', inviter: 'Sarah Chen',   inviterInitials: 'SC', inviterColor: '#60a5fa', role: 'Editor', sent: '2h ago',  description: 'Frontend component library and design system' },
    { id: '2', project: 'ML Experiments',    projectColor: '#f59e0b', inviter: 'Arjun Patel',  inviterInitials: 'AP', inviterColor: '#f59e0b', role: 'Viewer', sent: '1d ago',  description: 'Machine learning scripts and notebooks' },
    { id: '3', project: 'Infra as Code',     projectColor: '#34d399', inviter: 'Mia Hoffmann', inviterInitials: 'MH', inviterColor: '#34d399', role: 'Editor', sent: '3d ago',  description: 'Terraform and cloud provisioning scripts' },
];