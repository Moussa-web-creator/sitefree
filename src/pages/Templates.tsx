import React, { useState } from 'react';
import { Layout, Search, Filter, Crown, Eye, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/i18n';

const templates = [
  {
    id: '1',
    name: 'Modern Portfolio',
    category: 'Portfolio',
    preview: 'https://picsum.photos/seed/1/400/300',
    is_premium: false,
  },
  {
    id: '2',
    name: 'E-commerce Store',
    category: 'E-commerce',
    preview: 'https://picsum.photos/seed/2/400/300',
    is_premium: true,
  },
  {
    id: '3',
    name: 'SaaS Landing',
    category: 'SaaS',
    preview: 'https://picsum.photos/seed/3/400/300',
    is_premium: false,
  },
  {
    id: '4',
    name: 'Restaurant Menu',
    category: 'Restaurant',
    preview: 'https://picsum.photos/seed/4/400/300',
    is_premium: false,
  },
  {
    id: '5',
    name: 'Admin Dashboard',
    category: 'Dashboard',
    preview: 'https://picsum.photos/seed/5/400/300',
    is_premium: true,
  },
  {
    id: '6',
    name: 'Blog Theme',
    category: 'Blog',
    preview: 'https://picsum.photos/seed/6/400/300',
    is_premium: false,
  },
  {
    id: '7',
    name: 'Agency Website',
    category: 'Agency',
    preview: 'https://picsum.photos/seed/7/400/300',
    is_premium: true,
  },
  {
    id: '8',
    name: 'Mobile App UI',
    category: 'Mobile',
    preview: 'https://picsum.photos/seed/8/400/300',
    is_premium: true,
  },
  {
    id: '9',
    name: 'Startup Landing',
    category: 'SaaS',
    preview: 'https://picsum.photos/seed/9/400/300',
    is_premium: false,
  },
  {
    id: '10',
    name: 'Travel Blog',
    category: 'Blog',
    preview: 'https://picsum.photos/seed/10/400/300',
    is_premium: false,
  },
  {
    id: '11',
    name: 'Dark Theme Portfolio',
    category: 'Portfolio',
    preview: 'https://picsum.photos/seed/11/400/300',
    is_premium: false,
  },
  {
    id: '12',
    name: 'Crypto Dashboard',
    category: 'Dashboard',
    preview: 'https://picsum.photos/seed/12/400/300',
    is_premium: true,
  },
];

const categories = ['All', 'Portfolio', 'E-commerce', 'SaaS', 'Restaurant', 'Dashboard', 'Blog', 'Agency', 'Mobile'];

export function Templates() {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const canAccessPremium = profile && profile.subscription_plan !== 'free';

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4">
            <Layout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('templates', language)}</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Ready-to-use templates for quick content creation.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
              placeholder="Search templates..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <div className="flex gap-1 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    category === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="relative">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                {template.is_premium && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-amber-500 text-xs font-semibold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="btn btn-primary btn-sm">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-slate-400">{template.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center p-12 text-slate-400">
            <Layout className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p>No templates found</p>
          </div>
        )}

        {/* Template Modal */}
        {selectedTemplate && (
          <div className="modal-overlay" onClick={() => setSelectedTemplate(null)}>
            <div className="modal max-w-2xl p-0" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedTemplate.preview}
                alt={selectedTemplate.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                    <p className="text-sm text-slate-400">{selectedTemplate.category}</p>
                  </div>
                  {selectedTemplate.is_premium && (
                    <div className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Premium
                    </div>
                  )}
                </div>

                <p className="text-slate-300 mb-6">
                  A beautiful, responsive template ready to customize. Includes all source files and documentation.
                </p>

                {selectedTemplate.is_premium && !canAccessPremium ? (
                  <div className="p-4 rounded-lg bg-amber-500/20 text-amber-400 mb-4">
                    <p className="text-sm">
                      Premium templates require a Basic or Pro subscription.{' '}
                      <a href="/pricing" className="underline">Upgrade now</a>
                    </p>
                  </div>
                ) : null}

                <div className="flex gap-2">
                  <button
                    className="btn btn-primary flex-1"
                    disabled={selectedTemplate.is_premium && !canAccessPremium}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
