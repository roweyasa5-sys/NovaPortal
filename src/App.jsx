import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Gamepad2,
  LayoutGrid,
  Settings as SettingsIcon,
  Layers
} from 'lucide-react';
import { Starfield } from './components/Starfield';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { SettingsPanel } from './components/SettingsPanel';
import contentData from './data/content.json';

const DEFAULT_SETTINGS = {
  panicKey: 'G',
  panicUrl: 'https://classroom.google.com',
  cloakTitle: 'NovaPortal',
  cloakIcon: 'https://www.google.com/favicon.ico',
  searchEngine: 'google',
  theme: 'dark',
  backgroundUrl: '',
  showParticles: true,
};

export default function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('novaportal_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [tabs, setTabs] = useState([
    { id: 'home', title: 'Home', url: '', type: 'home' }
  ]);
  const [activeTabId, setActiveTabId] = useState('home');
  const [view, setView] = useState('home');

  // Panic Key Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toUpperCase() === settings.panicKey) {
        window.location.href = settings.panicUrl;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.panicKey, settings.panicUrl]);

  // Cloaking
  useEffect(() => {
    document.title = settings.cloakTitle;
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = settings.cloakIcon;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = settings.cloakIcon;
      document.head.appendChild(newLink);
    }
  }, [settings.cloakTitle, settings.cloakIcon]);

  // Save Settings
  useEffect(() => {
    localStorage.setItem('novaportal_settings', JSON.stringify(settings));
  }, [settings]);

  const handleNewTab = useCallback(() => {
    const newTab = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Tab',
      url: '',
      type: 'home'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setView('home');
  }, [tabs]);

  const handleCloseTab = useCallback((id) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      const remainingTab = newTabs[newTabs.length - 1];
      setActiveTabId(remainingTab.id);
      if (remainingTab.type === 'home') setView('home');
      else if (remainingTab.type === 'settings') setView('settings');
      else setView('home'); 
    }
  }, [tabs, activeTabId]);

  const handleOpenApp = (app) => {
    const existingTab = tabs.find(t => t.url === app.url);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const newTab = {
      id: Math.random().toString(36).substr(2, 9),
      title: app.name,
      url: app.url,
      type: app.category === 'game' ? 'game' : 'app'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleSearch = (query) => {
    let url = '';
    if (query.startsWith('http://') || query.startsWith('https://')) {
      url = query;
    } else if (query.includes('.') && !query.includes(' ')) {
      url = `https://${query}`;
    } else {
      const engineUrls = {
        google: 'https://www.google.com/search?q=',
        bing: 'https://www.bing.com/search?q=',
        duckduckgo: 'https://duckduckgo.com/?q='
      };
      url = `${engineUrls[settings.searchEngine]}${encodeURIComponent(query)}`;
    }

    const newTab = {
      id: Math.random().toString(36).substr(2, 9),
      title: query,
      url: url,
      type: 'browser'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  const renderContent = () => {
    if (activeTab && activeTab.url) {
      return (
        <div className="w-full h-full bg-black">
          <iframe 
            src={activeTab.url} 
            className="w-full h-full border-none"
            title={activeTab.title}
            allow="fullscreen"
          />
        </div>
      );
    }

    switch (view) {
      case 'settings':
        return <SettingsPanel settings={settings} onUpdate={setSettings} />;
      case 'games':
        return (
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            <div className="flex items-center gap-3 text-white">
              <Gamepad2 className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Games</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {contentData.games.map((game) => (
                <AppCard key={game.id} item={game} onClick={() => handleOpenApp(game)} />
              ))}
            </div>
          </div>
        );
      case 'apps':
        return (
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            <div className="flex items-center gap-3 text-white">
              <LayoutGrid className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Apps</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {contentData.apps.map((app) => (
                <AppCard key={app.id} item={app} onClick={() => handleOpenApp(app)} />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h1 className="text-7xl font-black text-white tracking-tighter">NovaPortal</h1>
              <p className="text-zinc-500 font-medium">Your minimal gateway to the web.</p>
            </motion.div>
            
            <SearchBar onSearch={handleSearch} searchEngine={settings.searchEngine} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
              <QuickAction icon={<Gamepad2 />} label="Games" onClick={() => setView('games')} />
              <QuickAction icon={<LayoutGrid />} label="Apps" onClick={() => setView('apps')} />
              <QuickAction icon={<Layers />} label="Tabs" onClick={() => {}} />
              <QuickAction icon={<SettingsIcon />} label="Settings" onClick={() => setView('settings')} />
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        settings.theme === 'midnight' ? 'bg-[#020617]' : 
        settings.theme === 'amethyst' ? 'bg-[#02010a]' : 
        'bg-zinc-950'
      }`}
      style={{
        backgroundImage: settings.backgroundUrl ? `url(${settings.backgroundUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Starfield active={settings.showParticles} />
      
      <Navbar 
        activeTabId={activeTabId}
        tabs={tabs}
        onSwitchTab={(id) => {
          setActiveTabId(id);
          const tab = tabs.find(t => t.id === id);
          if (tab?.type === 'home') setView('home');
          else if (tab?.type === 'settings') setView('settings');
        }}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
        onNavigate={(v) => {
          setView(v);
          const homeTab = tabs.find(t => t.type === 'home');
          if (homeTab) setActiveTabId(homeTab.id);
        }}
      />

      <main className="pt-24 relative z-10 w-full h-screen overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId + view}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const AppCard = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 cursor-pointer hover:border-zinc-600 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all"
    >
      <div className="aspect-square flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
          <Info className="w-8 h-8" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-sm truncate">{item.name}</h3>
        <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-widest font-bold">{item.category}</p>
      </div>
      <button className="absolute top-4 right-4 p-1.5 text-zinc-600 hover:text-white transition-colors">
        <Info className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const QuickAction = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-2xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all group"
    >
      <div className="text-zinc-400 group-hover:text-white transition-colors">
        {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'w-6 h-6' }) : icon}
      </div>
      <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300">{label}</span>
    </button>
  );
};
