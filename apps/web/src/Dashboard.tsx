import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import NewSnippetPanel from './components/NewSnippetPanel';
import MembersPanel from './components/MembersPanel';
import InvitationsPanel from './components/InvitationsPanel';
import ProfilePanel from './components/ProfilePanel';
import CollectionsPanel from './components/CollectionsPanel';
import type { NewSnippetData } from './components/NewSnippetPanel';
import { SNIPPETS, NAV_ITEMS, TAGS } from './data';

type View =
  | 'list'
  | 'new'
  | 'members'
  | 'invitations'
  | 'profile'
  | 'collections';

export default function Dashboard() {
  const [activeNavId, setActiveNavId] = useState('all');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>('list');
  const [activeProject, setActiveProject] = useState('proj-1');
  const [searchOpen, setSearchOpen] = useState(false);

  const activeNav = NAV_ITEMS.find((n) => n.id === activeNavId);
  const panelTitle = activeNav?.label ?? 'All snippets';

  function handleNavSelect(id: string) {
    setSidebarOpen(false);
    if (id === 'members') {
      setView('members');
      setActiveNavId('members');
      return;
    }
    if (id === 'invitations') {
      setView('invitations');
      setActiveNavId('invitations');
      return;
    }
    if (id === 'profile') {
      setView('profile');
      setActiveNavId('profile');
      return;
    }
    if (id === 'collections') {
      setView('collections');
      setActiveNavId('collections');
      return;
    }
    setActiveNavId(id);
    setView('list');
  }

  function handleTagSelect(tagId: string) {
    console.log('Tag selected:', tagId);
    setSidebarOpen(false);
  }

  function handleSelectProject(projectId: string) {
    setActiveProject(projectId);
    setView('members');
    setActiveNavId('members');
    setSidebarOpen(false);
  }

  function handleSave(data: NewSnippetData) {
    console.log('Save snippet:', data);
    setView('list');
  }

  function renderMain() {
    switch (view) {
      case 'collections':
        return <CollectionsPanel />;
      case 'members':
        return (
          <MembersPanel
            activeProject={activeProject}
            onSelectProject={handleSelectProject}
          />
        );
      case 'invitations':
        return <InvitationsPanel />;
      case 'profile':
        return <ProfilePanel />;
      case 'new':
        return (
          <NewSnippetPanel
            onSave={handleSave}
            onCancel={() => setView('list')}
          />
        );
      default:
        return (
          <MainPanel
            title={panelTitle}
            snippets={SNIPPETS}
            selectedId={selectedSnippetId}
            onSelect={setSelectedSnippetId}
            onFilter={() => console.log('filter')}
            onNew={() => setView('new')}
            onToggleSidebar={() => setSidebarOpen(true)}
            isSidebarOpen={sidebarOpen}
            onClose={() => setSelectedSnippetId(null)}
          />
        );
    }
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
      <Sidebar
        navItems={NAV_ITEMS}
        tags={TAGS}
        activeNavId={activeNavId}
        isOpen={sidebarOpen}
        activeProject={activeProject}
        onNavSelect={handleNavSelect}
        onTagSelect={handleTagSelect}
        onClose={() => setSidebarOpen(false)}
        onSelectProject={handleSelectProject}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">{renderMain()}</div>
    </div>
  );
}
