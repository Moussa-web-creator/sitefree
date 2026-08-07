import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { t } from '../../lib/i18n';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 animate-slideUp">
      <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-600 rounded-2xl p-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm">{t('cookieConsent', language)}</p>
              <Link to="/cookies" className="text-xs text-blue-400 hover:underline">
                {t('learnMoreCookies', language)}
              </Link>
            </div>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <button onClick={handleDecline} className="btn btn-secondary btn-sm">
              {t('declineCookies', language)}
            </button>
            <button onClick={handleAccept} className="btn btn-primary btn-sm">
              {t('acceptCookies', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
