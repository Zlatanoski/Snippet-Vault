import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import { SNIPPETS, NAV_ITEMS, TAGS } from './data';

export default function Dashboard() {
    const [activeNavId, setActiveNavId] = useState('all');
    const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>('1');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activeNav  = NAV_ITEMS.find((n) => n.id === activeNavId);
    const panelTitle = activeNav?.label ?? 'All snippets';

    function handleNavSelect(id: string) {
        setActiveNavId(id);
        setSidebarOpen(false); // close drawer on mobile after selection
    }

    function handleTagSelect(tagId: string) {
        console.log('Tag selected:', tagId);
        setSidebarOpen(false);
    }

    return (

        // h-dvh = dynamic viewport height — fills screen correctly on mobile too
        <div className="flex h-dvh w-screen overflow-hidden bg-gray-50 dark:bg-neutral-900">

            <Sidebar
                navItems={NAV_ITEMS}
                tags={TAGS}
                activeNavId={activeNavId}
                isOpen={sidebarOpen}
                onNavSelect={handleNavSelect}
                onTagSelect={handleTagSelect}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                <MainPanel
                    title={panelTitle}
                    snippets={SNIPPETS}
                    selectedId={selectedSnippetId}
                    onSelect={setSelectedSnippetId}
                    onFilter={() => console.log('filter')}
                    onNew={() => console.log('new snippet')}
                    onToggleSidebar={() => setSidebarOpen(true)}
                    isSidebarOpen={sidebarOpen}
                />
            </div>

        </div>
    );
}