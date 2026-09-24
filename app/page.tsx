'use client';

import React, { useState, useEffect } from 'react';
import { Search, Upload, Eye, Layers, Sparkles } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  score: number;
  image: string;
}

export default function VisionDashboard() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchQuery: string = '') => {
    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults(query);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-mono">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-slate-800 pb-5 mb-8">
        <div className="flex items-center gap-3">
          <Eye className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold tracking-wider">VISION-INDEX // MULTIMODAL SEARCH</h1>
            <p className="text-xs text-slate-500">Vector Embeddings & Visual Object Retrieval Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/40 px-3 py-1.5 rounded-full border border-indigo-800">
          <Sparkles className="w-4 h-4" /> Edge Vector DB Active
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Controls & Upload */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-400" /> Semantic Text Query
            </h2>
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search parts, safety gear..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-slate-950 font-bold py-2.5 rounded-lg transition text-sm flex items-center justify-center gap-2"
              >
                Execute Vector Search
              </button>
            </form>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-400" /> Visual Query Upload
            </h2>
            <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition">
              <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Drag & drop image or click to browse for visual matching</p>
            </div>
          </div>
        </div>

        {/* Right Column: Results Grid */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
          <h2 className="text-sm text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> Retrieval Results ({results.length})
          </h2>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-20 text-slate-500 text-sm">
              Querying vector embeddings...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition">
                  <div className="h-40 bg-slate-900 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900">{item.category}</span>
                      <h3 className="text-sm font-semibold mt-2 text-slate-200">{item.title}</h3>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-900 text-xs">
                      <span className="text-slate-500">Match Score:</span>
                      <span className="text-emerald-400 font-bold">{(item.score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}