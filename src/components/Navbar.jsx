import React from 'react';
import { 
  Gamepad2, 
  LayoutGrid, 
  Settings as SettingsIcon, 
  Layers,
  X,
  Plus
} from 'lucide-react';

export const Navbar = ({ 
  activeTabId, 
  tabs, 
  onSwitchTab, 
  onCloseTab, 
  onNewTab,
  onNavigate
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Main Nav */}
      <nav className="h-14 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all">
            <span className="text-black font-bold text-sm">NP</span>
          </div>
          <span className="text-white font-semibold tracking-tight hidden sm:block">NovaPortal</span>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => onNavigate('games')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all flex items-center gap-2 px-3"
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-sm font-medium hidden md:block">Games</span>
          </button>
          <button 
            onClick={() => onNavigate('apps')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all flex items-center gap-2 px-3"
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-sm font-medium hidden md:block">Apps</span>
          </button>
          <button 
            onClick={() => onNavigate('settings')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all flex items-center gap-2 px-3"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-sm font-medium hidden md:block">Settings</span>
          </button>
        </div>
      </nav>

      {/* Tabs Bar */}
      <div className="h-10 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800/50 flex items-center px-2 gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => onSwitchTab(tab.id)}
            className={`
              flex items-center gap-2 px-3 h-8 rounded-t-lg cursor-pointer transition-all min-w-[120px] max-w-[200px] group
              ${activeTabId === tab.id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'}
            `}
          >
            <Layers className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs font-medium truncate flex-1">{tab.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              className="p-0.5 rounded-md hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={onNewTab}
          className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
