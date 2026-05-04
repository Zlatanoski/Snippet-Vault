import { useState } from 'react';
import { Plus, Crown, X } from 'lucide-react';
import { PROJECTS, PROJECT_MEMBERS } from '../data';

const ROLE_STYLES = {
  Owner: {
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800/50',
  },
  Editor: {
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800/50',
  },
  Viewer: {
    bg: 'bg-slate-100 dark:bg-neutral-800',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-neutral-700',
  },
};

interface Props {
  activeProject: string;
  onSelectProject: (id: string) => void;
}

export default function MembersPanel({
  activeProject,
  onSelectProject,
}: Props) {
  const project = PROJECTS.find((p) => p.id === activeProject) ?? PROJECTS[0];
  const members = PROJECT_MEMBERS[activeProject] ?? PROJECT_MEMBERS['proj-1'];
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visibleMembers = members.filter(
    (m) => !dismissed.includes(m.id) || m.role === 'Owner',
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-neutral-900 min-w-0">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800 bg-gray-50/90 dark:bg-neutral-900/90 backdrop-blur-md flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
            Members
          </h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-px flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: project.color }}
            />
            {project.name} · {visibleMembers.length} member
            {visibleMembers.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-white bg-indigo-500 shadow-sm ring-1 ring-indigo-500/40 transition-all hover:bg-indigo-400 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2">
          <Plus className="w-3 h-3" />
          Invite member
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex gap-0 border-b border-gray-200 dark:border-neutral-800 mb-6">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className={[
                'flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 -mb-px transition-colors',
                activeProject === p.id
                  ? 'border-indigo-500 text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
              ].join(' ')}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: p.color,
                  opacity: activeProject === p.id ? 1 : 0.5,
                }}
              />
              {p.name}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden max-w-4xl">
          <div
            className="grid items-center px-5 py-2.5 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700"
            style={{ gridTemplateColumns: '1fr 110px 100px 80px 80px' }}
          >
            {['Member', 'Role', 'Joined', 'Snippets', ''].map((h, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500"
              >
                {h}
              </span>
            ))}
          </div>

          {visibleMembers.map((m, i) => {
            const rs = ROLE_STYLES[m.role];
            return (
              <div
                key={m.id}
                className={[
                  'grid items-center px-5 py-3.5 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800',
                  i < visibleMembers.length - 1
                    ? 'border-b border-gray-100 dark:border-neutral-700/60'
                    : '',
                ].join(' ')}
                style={{ gridTemplateColumns: '1fr 110px 100px 80px 80px' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `${m.color}25`,
                        border: `1px solid ${m.color}40`,
                        color: m.color,
                      }}
                    >
                      {m.initials}
                    </div>
                    {m.online && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-800" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {m.name}
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                      {m.handle}
                    </p>
                  </div>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${rs.bg} ${rs.text} ${rs.border}`}
                  >
                    {m.role === 'Owner' && <Crown className="w-2.5 h-2.5" />}
                    {m.role}
                  </span>
                </div>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {m.joined}
                </span>

                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {m.snippets}
                </span>

                <div className="flex justify-end">
                  {m.role !== 'Owner' && (
                    <button
                      onClick={() => setDismissed((p) => [...p, m.id])}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-neutral-700 hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 transition-colors"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="group max-w-4xl mt-4 border border-dashed border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex-shrink-0">
            <Plus className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Invite a team member
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Share snippets and collaborate on {project.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
