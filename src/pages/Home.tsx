import React from 'react';
import { Link } from 'react-router-dom';
import {
  Video, Image, Globe, Smartphone, Bot, Layout, Zap, Shield, Clock,
  Sparkles, ArrowRight, Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/i18n';

const features = [
  {
    icon: Video,
    title: 'videoGenerator',
    description: 'videoGenDesc',
    path: '/video-generator',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Image,
    title: 'imageGenerator',
    description: 'imageGenDesc',
    path: '/image-generator',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'websiteGenerator',
    description: 'websiteGenDesc',
    path: '/website-generator',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'appGenerator',
    description: 'appGenDesc',
    path: '/app-generator',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Bot,
    title: 'aiAgents',
    description: 'aiAgentsDesc',
    path: '/ai-agents',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Layout,
    title: 'templates',
    description: 'templatesDesc',
    path: '/templates',
    color: 'from-amber-500 to-yellow-500',
  },
];

const stats = [
  { value: '10M+', label: 'Generations' },
  { value: '150+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

export function Home() {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative py-20 lg:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Powered by Cloud AI</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">{t('heroTitle', language)}</span>
              </h1>

              <p className="text-xl text-slate-400 mb-8 max-w-lg">
                {t('heroSubtitle', language)}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={user ? '/dashboard' : '/register'}
                  className="btn btn-primary btn-lg group"
                >
                  {t('getStarted', language)}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/pricing" className="btn btn-outline btn-lg">
                  {t('learnMore', language)}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Instant generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Secure & private</span>
                </div>
              </div>
            </div>

            <div className="animate-slideLeft hidden lg:block">
              <div className="relative">
                {/* Floating cards */}
                <div className="absolute -top-8 -right-8 w-48 h-48 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-4 shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
                  <Video className="w-12 h-12 text-white mb-3" />
                  <div className="h-3 w-20 bg-white/30 rounded mb-2" />
                  <div className="h-2 w-32 bg-white/20 rounded" />
                </div>

                <div className="absolute top-20 -left-12 w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-2xl animate-float" style={{ animationDelay: '0.5s' }}>
                  <Image className="w-12 h-12 text-white mb-3" />
                  <div className="h-3 w-24 bg-white/30 rounded mb-2" />
                  <div className="h-2 w-28 bg-white/20 rounded" />
                </div>

                <div className="absolute -bottom-4 right-20 w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                  <Globe className="w-12 h-12 text-white mb-3" />
                  <div className="h-3 w-22 bg-white/30 rounded mb-2" />
                  <div className="h-2 w-30 bg-white/20 rounded" />
                </div>

                <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-slate-600 rounded mb-1" />
                      <div className="h-2 w-16 bg-slate-700 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-700 rounded" />
                    <div className="h-3 w-4/5 bg-slate-700 rounded" />
                    <div className="h-3 w-3/4 bg-slate-700 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-700"
              >
                <p className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('featuresTitle', language)}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('featuresSubtitle', language)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.path}
                className="feature-card card p-6 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {t(feature.title, language)}
                </h3>
                <p className="text-slate-400 text-sm">
                  {t(feature.description, language)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-400">Start free, upgrade when you need</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="card p-6">
              <h3 className="text-2xl font-bold mb-2">{t('freePlan', language)}</h3>
              <p className="text-slate-400 mb-4">{t('freeForever', language)}</p>
              <p className="text-4xl font-bold mb-6">$0</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>500 credits</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t('bonusCredits', language)}</span>
                </li>
              </ul>
              <Link to="/register" className="btn btn-outline w-full">
                {t('getStarted', language)}
              </Link>
            </div>

            {/* Basic Plan */}
            <div className="card p-6 relative border-blue-500">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-xs font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('basicPlan', language)}</h3>
              <p className="text-slate-400 mb-4">Best for individuals</p>
              <p className="text-4xl font-bold mb-6">
                $1<span className="text-lg text-slate-400">{t('perMonth', language)}</span>
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>5,000 credits/month</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Priority queue</span>
                </li>
              </ul>
              <Link to="/pricing" className="btn btn-primary w-full">
                {t('choosePlan', language)}
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="card p-6">
              <h3 className="text-2xl font-bold mb-2">{t('proPlan', language)}</h3>
              <p className="text-slate-400 mb-4">For power users</p>
              <p className="text-4xl font-bold mb-6">
                $2<span className="text-lg text-slate-400">{t('perMonth', language)}</span>
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited credits</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>API access</span>
                </li>
              </ul>
              <Link to="/pricing" className="btn btn-outline w-full">
                {t('choosePlan', language)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Create with AI?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of creators already using williamstore AI
            </p>
            <Link
              to={user ? '/dashboard' : '/register'}
              className="btn btn-primary btn-lg group"
            >
              {t('getStarted', language)}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
