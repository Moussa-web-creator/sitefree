import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/i18n';

export function Privacy() {
  const { language } = useLanguage();

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Data Collection',
      content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, payment information, and any other information you choose to provide.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and communicate with you about products, services, and events.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.',
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: 'Cookies & Tracking',
      content: 'We use cookies and similar tracking technologies to collect and track information about your activities on our website. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Third-Party Sharing',
      content: 'We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users.',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('privacyPolicy', language)}</h1>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Introduction */}
        <div className="card p-8 mb-8">
          <p className="text-slate-300 leading-relaxed">
            williamstore AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index} className="card p-8 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-slate-300 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Sections */}
        <div className="card p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Access and receive a copy of your personal data</li>
            <li>Rectify inaccurate personal data</li>
            <li>Erase your personal data</li>
            <li>Object to or restrict processing of your personal data</li>
            <li>Data portability</li>
          </ul>
        </div>

        <div className="card p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-slate-300">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@williamstore.top" className="text-blue-400 hover:underline">
              privacy@williamstore.top
            </a>
          </p>
        </div>

        {/* Changes Notice */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </div>
      </div>
    </div>
  );
}
