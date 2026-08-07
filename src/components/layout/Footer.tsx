import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { t } from '../../lib/i18n';

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="font-bold text-lg gradient-text">williamstore AI</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Create amazing content with cutting-edge AI technology.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/williamstore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/williamstore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/williamstore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="font-semibold mb-4">{t('aiTools', language)}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/video-generator" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('videoGenerator', language)}
                </Link>
              </li>
              <li>
                <Link to="/image-generator" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('imageGenerator', language)}
                </Link>
              </li>
              <li>
                <Link to="/website-generator" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('websiteGenerator', language)}
                </Link>
              </li>
              <li>
                <Link to="/app-generator" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('appGenerator', language)}
                </Link>
              </li>
              <li>
                <Link to="/ai-agents" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('aiAgents', language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('pricing', language)}
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('templates', language)}
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('siteStatus', language)}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('contact', language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('privacyPolicy', language)}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('termsOfService', language)}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('cookiePolicy', language)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} williamstore.top. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Powered by Cloud AI
            <ExternalLink className="inline-block w-3 h-3 ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
}
