import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Wand2, Loader, Download, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import { createGeneration, getProfile } from '../lib/supabase';
import { t } from '../lib/i18n';

const examples = [
  'A serene sunset over a mountain lake with golden clouds',
  'A futuristic city with flying cars at night',
  'A magical forest with glowing mushrooms and fairies',
  'An underwater scene with colorful coral and fish',
  'A cozy coffee shop in a rainy evening',
];

export function VideoGenerator() {
  const { user, profile } = useAuth();
  const { language } = useLanguage();
  const { showNotification } = useNotification();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const creditsRequired = 10;

  const handleGenerate = async () => {
    if (!user) {
      showNotification('warning', 'Please log in to generate videos');
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
      await createGeneration(user.id, 'video', prompt, creditsRequired);
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResult(`https://api.williamstore.ai/video/${Date.now()}.mp4`);
      showNotification('success', 'Video generated successfully!');
    } catch (error) {
      showNotification('error', 'Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('generateVideo', language)}</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Create stunning videos from text descriptions using cutting-edge AI technology.
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

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="label">{t('yourPrompt', language)}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input min-h-[120px]"
              placeholder={t('enterPrompt', language)}
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
                {t('generateVideo', language)}
              </>
            )}
          </button>

          {!user && (
            <div className="flex items-center gap-2 justify-center mt-4 p-3 rounded-lg bg-amber-500/20 text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>
                <Link to="/login" className="underline">Login</Link> to generate videos
              </span>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 p-4 rounded-xl bg-slate-700/50 border border-slate-600">
              <div className="aspect-video bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Video generated successfully</p>
                  <p className="text-xs text-slate-500 mt-1">Preview not available - click download</p>
                </div>
              </div>
              <button className="btn btn-success w-full">
                <Download className="w-4 h-4" />
                {t('downloadResult', language)}
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Fast Generation</h3>
            <p className="text-sm text-slate-400">Generate videos in seconds with our optimized AI</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">High Quality</h3>
            <p className="text-sm text-slate-400">Stunning 1080p video output</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Multiple Styles</h3>
            <p className="text-sm text-slate-400">Cinematic, anime, realistic and more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
