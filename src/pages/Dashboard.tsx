import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Video, Image, Globe, Smartphone, Bot, Clock,
  TrendingUp, CreditCard, Gift, Loader
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import { getGenerationHistory, createGeneration } from '../lib/supabase';
import { t } from '../lib/i18n';
import type { GenerationHistory } from '../types';
import { PaymentsModal } from '../components/PaymentsModal';

const tools = [
  { icon: Video, name: 'videoGenerator', path: '/video-generator', color: 'from-red-500 to-orange-500', credits: 10 },
  { icon: Image, name: 'imageGenerator', path: '/image-generator', color: 'from-purple-500 to-pink-500', credits: 5 },
  { icon: Globe, name: 'websiteGenerator', path: '/website-generator', color: 'from-blue-500 to-cyan-500', credits: 15 },
  { icon: Smartphone, name: 'appGenerator', path: '/app-generator', color: 'from-emerald-500 to-teal-500', credits: 20 },
  { icon: Bot, name: 'aiAgents', path: '/ai-agents', color: 'from-indigo-500 to-violet-500', credits: 10 },
];

export function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const { showNotification } = useNotification();
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showPayments, setShowPayments] = useState(false);

  useEffect(() => {
    if (user) {
      setHistoryLoading(true);
      getGenerationHistory(user.id)
        .then(setHistory)
        .catch(console.error)
        .finally(() => setHistoryLoading(false));
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Please log in to access your dashboard</p>
          <Link to="/login" className="btn btn-primary">
            {t('login', language)}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('welcomeBack', language)}, {profile.full_name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-400">Manage your AI generations and credits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Credits */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="badge badge-success">{t('freePlan', language)}</span>
            </div>
            <p className="text-slate-400 text-sm">{t('yourCredits', language)}</p>
            <p className="text-3xl font-bold">{profile.credits.toLocaleString()}</p>
            <button
              onClick={() => setShowPayments(true)}
              className="btn btn-primary btn-sm w-full mt-4"
            >
              <CreditCard className="w-4 h-4" />
              Buy More Credits
            </button>
          </div>

          {/* Generations */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-400 text-sm">Total Generations</p>
            <p className="text-3xl font-bold">{history.length}</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>Active user</span>
            </div>
          </div>

          {/* Bonus Timer */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-400 text-sm">{t('bonusCredits', language)}</p>
            <p className="text-2xl font-bold">500 credits</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-amber-400">
              <Clock className="w-4 h-4" />
              <span>Every 10 days</span>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.path}
                className="card p-4 text-center hover:scale-105 transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto mb-3`}
                >
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{t(tool.name, language)}</p>
                <p className="text-xs text-slate-400 mt-1">{tool.credits} credits</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('recentGenerations', language)}</h2>
          {historyLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : history.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-400 mb-4">No generations yet</p>
              <Link to="/" className="btn btn-primary">
                Start Generating
              </Link>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('type', language)}</th>
                    <th>{t('description', language)}</th>
                    <th>{t('credits', language)}</th>
                    <th>{t('status', language)}</th>
                    <th>{t('date', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 10).map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="badge badge-primary capitalize">
                          {item.generation_type}
                        </span>
                      </td>
                      <td className="max-w-xs truncate">{item.prompt}</td>
                      <td>{item.credits_used}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === 'completed'
                              ? 'badge-success'
                              : item.status === 'failed'
                              ? 'badge-error'
                              : 'badge-warning'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PaymentsModal isOpen={showPayments} onClose={() => setShowPayments(false)} />
    </div>
  );
}
