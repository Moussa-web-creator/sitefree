import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, LogOut, Settings, Save, Loader, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { updateProfile, signOut } from '../lib/supabase';
import { t } from '../lib/i18n';

export function Profile() {
  const { user, profile } = useAuth();
  const { showNotification } = useNotification();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user.id, { full_name: formData.full_name });
      showNotification('success', 'Profile updated successfully');
      window.location.reload();
    } catch (error) {
      showNotification('error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      showNotification('error', 'Failed to logout');
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white">
              {profile.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <h1 className="text-2xl font-bold">{profile.full_name || 'User'}</h1>
          <p className="text-slate-400">{profile.email}</p>
        </div>

        {/* Profile Form */}
        <div className="card p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-semibold">{t('profile', language)}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">{t('fullName', language)}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">{t('email', language)}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="input pl-10 bg-slate-700/50 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {t('save', language)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div className="card p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6">{t('subscription', language)}</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Plan</span>
              <span className="font-semibold capitalize">{profile.subscription_plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Credits</span>
              <span className="font-semibold">{profile.credits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Member since</span>
              <span>{new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Manage your password and security settings through Supabase authentication.
          </p>
          <button disabled className="btn btn-outline w-full">
            Change Password
          </button>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="btn btn-danger w-full">
          <LogOut className="w-5 h-5" />
          {t('logout', language)}
        </button>
      </div>
    </div>
  );
}
