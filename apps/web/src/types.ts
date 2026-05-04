export type Language = 'ts' | 'py' | 'sh' | 'sql' | 'js' | 'css' | 'json';

export interface Snippet {
  id: string;
  title: string;
  language: Language;
  preview: string;
  description?: string;
  tags: string[];
  updatedAt: string;
  isPublic?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  count: number;
  icon: 'all' | 'favourites' | 'private' | 'collections';
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  count: number;
  updatedAt: string;
  color: string;
}

export interface Tag {
  id: string;
  label: string;
  color: string;
  count: number;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Member {
  id: string;
  name: string;
  handle: string;
  initials: string;
  color: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  joined: string;
  snippets: number;
  online: boolean;
}

export interface Invitation {
  id: string;
  project: string;
  projectColor: string;
  inviter: string;
  inviterInitials: string;
  inviterColor: string;
  role: 'Editor' | 'Viewer';
  sent: string;
  description: string;
}
