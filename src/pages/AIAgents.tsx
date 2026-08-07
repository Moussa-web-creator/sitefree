import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Wand2, Loader, AlertCircle, Zap, MessageSquare, Cpu, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import { createGeneration, getProfile } from '../lib/supabase';
import { t } from '../lib/i18n';

const agents = [
  {
    name: 'Research Assistant',
    description: 'Finds and summarizes information from the web',
    icon: '📚',
    credits: 10,
  },
  {
    name: 'Code Helper',
    description: 'Writes, reviews, and debugs code',
    icon: '💻',
    credits: 15,
  },
  {
    name: 'Content Writer',
    description: 'Creates blog posts, articles, and copy',
    icon: '✍️',
    credits: 10,
  },
  {
    name: 'Data Analyst',
    description: 'Analyzes data and generates insights',
    icon: '📊',
    credits: 20,
  },
  {
    name: 'Customer Support',
    description: 'Handles customer inquiries and tickets',
    icon: '🎧',
    credits: 10,
  },
  {
    name: 'Task Automator',
    description: 'Automates repetitive tasks and workflows',
    icon: '⚙️',
    credits: 15,
  },
];

export function AIAgents() {
  const { user, profile } = useAuth();
  const { language } = useLanguage();
  const { showNotification } = useNotification();
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!user) {
      showNotification('warning', 'Please log in to use AI agents');
      return;
    }

    if (!selectedAgent) {
      showNotification('error', 'Please select an agent');
      return;
    }

    if (!task.trim()) {
      showNotification('error', 'Please enter a task');
      return;
    }

    const currentProfile = await getProfile(user.id);
    if (!currentProfile || currentProfile.credits < selectedAgent.credits) {
      showNotification('error', t('notEnoughCredits', language));
      return;
    }

    setLoading(true);
    try {
      await createGeneration(user.id, 'agent', `${selectedAgent.name}: ${task}`, selectedAgent.credits);
      // Simulate AI execution
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResult(`Task completed by ${selectedAgent.name}. Here's the output...`);
      showNotification('success', 'Task completed successfully!');
    } catch (error) {
      showNotification('error', 'Failed to execute task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('aiAgents', language)}</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Deploy intelligent agents for various tasks and automation.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => setSelectedAgent(agent)}
              className={`card p-6 text-left transition-all ${
                selectedAgent?.name === agent.name
                  ? 'ring-2 ring-indigo-500 border-indigo-500'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">
                  {agent.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-xs text-slate-400">{agent.credits} credits/task</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">{agent.description}</p>
            </button>
          ))}
        </div>

        {/* Agent Interface */}
        {selectedAgent && (
          <div className="card p-8 animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center text-3xl">
                {selectedAgent.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedAgent.name}</h2>
                <p className="text-sm text-slate-400">{selectedAgent.description}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-slate-400">Cost per task</p>
                <p className="text-lg font-bold text-indigo-400">{selectedAgent.credits} credits</p>
              </div>
            </div>

            {/* Task Input */}
            <div className="mb-6">
              <label className="label">Describe your task</label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="input min-h-[120px]"
                placeholder={`Tell the ${selectedAgent.name} what you need...`}
              />
            </div>

            {/* Credits Info */}
            <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-slate-700/50">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>{t('creditsRequired', language)}: {selectedAgent.credits}</span>
              </div>
              <span className="text-slate-400">
                {profile ? `${profile.credits} credits available` : 'Login required'}
              </span>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleExecute}
              disabled={loading || !user}
              className="btn btn-primary w-full btn-lg"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Run Agent
                </>
              )}
            </button>

            {!user && (
              <div className="flex items-center gap-2 justify-center mt-4 p-3 rounded-lg bg-amber-500/20 text-amber-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>
                  <Link to="/login" className="underline">Login</Link> to use agents
                </span>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-8 p-4 rounded-xl bg-slate-700/50 border border-slate-600">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  <span className="font-medium">Agent Output</span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">{result}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedAgent && (
          <div className="text-center p-12 text-slate-400">
            <Bot className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p>Select an agent above to get started</p>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Powerful AI</h3>
            <p className="text-sm text-slate-400">State-of-the-art language models</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Customizable</h3>
            <p className="text-sm text-slate-400">Configure agents for your needs</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Fast Execution</h3>
            <p className="text-sm text-slate-400">Tasks completed in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
