import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Wand2, Loader, Download, AlertCircle, Zap, Code, Layout } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import { createGeneration, getProfile } from '../lib/supabase';
import { t } from '../lib/i18n';

const examples = [
  'A modern e-commerce website for a fashion brand',
  'A portfolio website for a photographer',
  'A SaaS landing page with pricing table',
  'A blog with dark theme and infinite scroll',
  'A restaurant website with online ordering',
];

const templates = [
  { name: 'E-commerce', icon: '🛒' },
  { name: 'Portfolio', icon: '💼' },
  { name: 'SaaS', icon: '☁️' },
  { name: 'Blog', icon: '📝' },
  { name: 'Restaurant', icon: '🍽️' },
  { name: 'Agency', icon: '🏢' },
];

export function WebsiteGenerator() {
  const { user, profile } = useAuth();
  const { language } = useLanguage();
  const { showNotification } = useNotification();
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const creditsRequired = 15;

  const handleGenerate = async () => {
    if (!user) {
      showNotification('warning', 'Please log in to generate websites');
      return;
    }

    if (!prompt.trim()) {
      showNotification('error', 'Please enter a prompt');
      return;
    }

    const currentProfile = await getProfile(user.id);
    if (!currentProfile || currentProfile.credits < creditsRequired) {
      showNotification('error', t('notEnoughCredits', language));
      return;
    }

    setLoading(true);
    try {
      await createGeneration(user.id, 'website', `${prompt} ${selectedTemplate ? `(${selectedTemplate})` : ''}`, creditsRequired);
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResult(`https://template.williamstore.ai/${Date.now()}`);
      showNotification('success', 'Website generated successfully!');
    } catch (error) {
      showNotification('error', 'Failed to generate website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('generateWebsite', language)}</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Build complete, responsive websites automatically with AI assistance.
          </p>
        </div>

        {/* Generator Card */}
        <div className="card p-8">
          {/* Credits Info */}
          <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-slate-700/50">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>{t('creditsRequired', language)}: {creditsRequired}</span>
            </div>
            <span className="text-slate-400">
              {profile ? `${profile.credits} credits available` : 'Login required'}
            </span>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <label className="label">Choose a Template (Optional)</label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTemplate(t.name)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    selectedTemplate === t.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="label">{t('yourPrompt', language)}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input min-h-[120px]"
              placeholder="Describe your website..."
            />
          </div>

          {/* Examples */}
          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {examples.slice(0, 3).map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                >
                  {example.length > 40 ? example.slice(0, 40) + '...' : example}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !user}
            className="btn btn-primary w-full btn-lg"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                {t('generating', language)}
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                {t('generateWebsite', language)}
              </>
            )}
          </button>

          {!user && (
            <div className="flex items-center gap-2 justify-center mt-4 p-3 rounded-lg bg-amber-500/20 text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>
                <Link to="/login" className="underline">Login</Link> to generate websites
              </span>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 p-4 rounded-xl bg-slate-700/50 border border-slate-600">
              <div className="aspect-video bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Layout className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Website generated</p>
                  <p className="text-xs text-slate-500 mt-1">HTML, CSS, and JS files ready</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-success flex-1">
                  <Code className="w-4 h-4" />
                  View Code
                </button>
                <button className="btn btn-primary flex-1">
                  <Download className="w-4 h-4" />
                  Download ZIP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Clean Code</h3>
            <p className="text-sm text-slate-400">Modern HTML, CSS, TypeScript ready</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Layout className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Responsive</h3>
            <p className="text-sm text-slate-400">Mobile-first design included</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Fast Load</h3>
            <p className="text-sm text-slate-400">Optimized for performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
