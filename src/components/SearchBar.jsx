import React from 'react';
import { Search, Globe } from 'lucide-react';

export const SearchBar = ({ onSearch, searchEngine }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search or enter a URL"
        className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl py-4 pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-all backdrop-blur-sm placeholder:text-zinc-600"
      />
      <div className="absolute inset-y-0 right-4 flex items-center">
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-lg text-xs text-zinc-400 font-medium">
          <Globe className="w-3 h-3" />
          {searchEngine === 'google' ? 'Google' : 'Bing'}
        </div>
      </div>
    </form>
  );
};
