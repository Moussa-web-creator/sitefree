import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Video, Image, Globe, Smartphone, Bot, Layout, CreditCard, Mail,
  LayoutDashboard, Shield, Settings, LogOut, Menu, X, ChevronLeft, Languages
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { t, languages, getLanguageName } from '../../lib/i18n';
import type { Language } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user, profile, isAdmin, loading } = useAuth();
  const { language, setLanguage, isRtl } = useLanguage();

  const userNavItems = [
    { path: '/', icon: Home, label: t('home', language) },
    { path: '/video-generator', icon: Video, label: t('videoGenerator', language) },
    { path: '/image-generator', icon: Image, label: t('imageGenerator', language) },
    { path: '/website-generator', icon: Globe, label: t('websiteGenerator', language) },
    { path: '/app-generator', icon: Smartphone, label: t('appGenerator', language) },
    { path: '/ai-agents', icon: Bot, label: t('aiAgents', language) },
    { path: '/templates', icon: Layout, label: t('templates', language) },
    { path: '/pricing', icon: CreditCard, label: t('pricing', language) },
    { path: '/contact', icon: Mail, label: t('contact', language) },
  ];

  const dashboardItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard', language), requiresAuth: true },
    { path: '/admin', icon: Shield, label: t('adminDashboard', language), requiresAdmin: true },
  ];

  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? 'open' : ''} flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 mb-4">
          <Link to="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-lg gradient-text">williamstore</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase mb-2">
              {t('aiTools', language)}
            </h3>
            {userNavItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Dashboard Links */}
          {!loading && (
            <div className="mb-6">
              <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase mb-2">
                {t('dashboard', language)}
              </h3>
              {dashboardItems.map(item => {
                if (item.requiresAuth && !user) return null;
                if (item.requiresAdmin && !isAdmin) return null;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-600 pt-4">
          {/* Language Selector */}
          <div className="px-4 mb-4">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-2 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span className="flex-1 text-sm">{getLanguageName(language)}</span>
              <ChevronLeft className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* User Info / Auth */}
          {loading ? (
            <div className="px-4">
              <div className="h-12 shimmer rounded-lg" />
            </div>
          ) : user && profile ? (
            <div className="px-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {profile.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {profile.full_name || user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-slate-400">
                    {profile.credits} {t('credits', language)}
                  </p>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={onClose}
                className="sidebar-item"
              >
                <Settings className="w-5 h-5" />
                <span>{t('profile', language)}</span>
              </Link>
            </div>
          ) : (
            <div className="px-4 space-y-2">
              <Link
                to="/login"
                onClick={onClose}
                className="btn btn-primary w-full"
              >
                {t('login', language)}
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="btn btn-outline w-full"
              >
                {t('register', language)}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 border border-slate-600"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
