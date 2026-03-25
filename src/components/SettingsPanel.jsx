import React from 'react';
import { 
  Keyboard, 
  Shield, 
  Search, 
  Palette, 
  Image as ImageIcon, 
  Zap, 
  Trash2,
  Save
} from 'lucide-react';

export const SettingsPanel = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSave = () => {
    onUpdate(localSettings);
  };

  const cloakPresets = [
    { title: 'Google Docs', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
    { title: 'Google Classroom', icon: 'https://classroom.google.com/favicon.png' },
    { title: 'School Portal', icon: 'https://www.google.com/favicon.ico' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-zinc-200 transition-all"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panic Key */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Keyboard className="w-5 h-5 text-zinc-400" />
            <h2 className="font-semibold">Panic Key System</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Trigger Key</label>
              <input
                type="text"
                maxLength={1}
                value={localSettings.panicKey}
                onChange={(e) => setLocalSettings({ ...localSettings, panicKey: e.target.value.toUpperCase() })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-1 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Redirect URL</label>
              <input
                type="text"
                value={localSettings.panicUrl}
                onChange={(e) => setLocalSettings({ ...localSettings, panicUrl: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-1 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </section>

        {/* Tab Cloaker */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Shield className="w-5 h-5 text-zinc-400" />
            <h2 className="font-semibold">Tab Cloaker</h2>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {cloakPresets.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => setLocalSettings({ ...localSettings, cloakTitle: preset.title, cloakIcon: preset.icon })}
                  className="text-[10px] bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                >
                  {preset.title}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Custom Title"
              value={localSettings.cloakTitle}
              onChange={(e) => setLocalSettings({ ...localSettings, cloakTitle: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:outline-none focus:border-zinc-600"
            />
          </div>
        </section>

        {/* Search Engine */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Search className="w-5 h-5 text-zinc-400" />
            <h2 className="font-semibold">Search Engine</h2>
          </div>
          <select
            value={localSettings.searchEngine}
            onChange={(e) => setLocalSettings({ ...localSettings, searchEngine: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:outline-none focus:border-zinc-600"
          >
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="duckduckgo">DuckDuckGo</option>
          </select>
        </section>

        {/* Theme */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Palette className="w-5 h-5 text-zinc-400" />
            <h2 className="font-semibold">Theme Customization</h2>
          </div>
          <div className="flex gap-2">
            {['dark', 'midnight', 'amethyst'].map((t) => (
              <button
                key={t}
                onClick={() => setLocalSettings({ ...localSettings, theme: t })}
                className={`
                  flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all
                  ${localSettings.theme === t ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-600'}
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Background */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-white">
            <ImageIcon className="w-5 h-5 text-zinc-400" />
            <h2 className="font-semibold">Background</h2>
          </div>
          <input
            type="text"
            placeholder="Background Image URL"
            value={localSettings.backgroundUrl}
            onChange={(e) => setLocalSettings({ ...localSettings, backgroundUrl: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:outline-none focus:border-zinc-600"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Starfield Particles</span>
            <button
              onClick={() => setLocalSettings({ ...localSettings, showParticles: !localSettings.showParticles })}
              className={`
                w-12 h-6 rounded-full transition-all relative
                ${localSettings.showParticles ? 'bg-white' : 'bg-zinc-800'}
              `}
            >
              <div className={`
                absolute top-1 w-4 h-4 rounded-full transition-all
                ${localSettings.showParticles ? 'right-1 bg-black' : 'left-1 bg-zinc-500'}
              `} />
            </button>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Zap className="w-5 h-5 text-zinc-400" />
            <h2 className="font-semibold">Data Management</h2>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all settings?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-900/20 text-red-500 border border-red-900/50 py-2 rounded-lg hover:bg-red-900/30 transition-all text-sm font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Data
          </button>
        </section>
      </div>
    </div>
  );
};
