import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight, Loader } from 'lucide-react';
import { signIn } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/i18n';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, profile, isAdmin } = useAuth();
  const { showNotification } = useNotification();
  const { language } = useLanguage();

  React.useEffect(() => {
    if (user && profile) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        showNotification('error', t('adminOnly', language));
        navigate('/');
      }
    }
  }, [user, profile, isAdmin, navigate, showNotification, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      // Check admin status after login
      setTimeout(() => {
        const checkAdmin = async () => {
          const { getProfile } = await import('../lib/supabase');
          if (user) {
            const userProfile = await getProfile(user.id);
            if (userProfile?.is_admin) {
              showNotification('success', 'Welcome, Admin!');
              navigate('/admin');
            } else {
              showNotification('error', 'Access denied. Admin privileges required.');
              navigate('/');
            }
          }
        };
        checkAdmin();
      }, 1000);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Admin login failed';
      showNotification('error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 hero-gradient">
      <div className="w-full max-w-md">
        <div className="card p-8 animate-slideUp border-red-500/30 border">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">{t('adminLogin', language)}</h1>
            <p className="text-slate-400 mt-2">{t('adminOnly', language)}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{t('email', language)}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="admin@williamstore.top"
                />
              </div>
            </div>

            <div>
              <label className="label">{t('password', language)}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-danger w-full">
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {t('signIn', language)}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Warning */}
          <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-400 text-center">
              This is a restricted area. Unauthorized access attempts are logged and may result in permanent ban.
            </p>
          </div>

          <p className="text-center mt-4">
            <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300">
              Regular user login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
