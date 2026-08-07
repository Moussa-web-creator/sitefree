import React from 'react';
import { FileText, Check, X, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/i18n';

export function Terms() {
  const { language } = useLanguage();

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing or using williamstore AI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily use williamstore AI for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose, or attempt to decompile any software contained on the website.',
    },
    {
      title: 'Account Registration',
      content: 'To access certain features, you may be required to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your password.',
    },
    {
      title: 'Credits and Payments',
      content: 'Credits are used to access certain features of the service. Credits can be purchased or earned through promotional activities. All purchases are final and non-refundable unless otherwise stated. Subscription plans renew automatically unless cancelled before the renewal date.',
    },
    {
      title: 'Content Generation',
      content: 'You retain ownership of content you input into the service. AI-generated content is provided for your use. You agree not to use the service to generate content that is illegal, harmful, infringing, or violates the rights of others.',
    },
    {
      title: 'Prohibited Uses',
      content: 'You may not use the service for any unlawful purpose, to solicit others to perform unlawful acts, to violate any international, federal, provincial, or state regulations, rules, laws, or local municipal laws, or to infringe upon intellectual property rights.',
    },
    {
      title: 'Disclaimer',
      content: 'The materials on williamstore AI are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
    },
    {
      title: 'Limitations',
      content: 'In no event shall williamstore AI or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.',
    },
    {
      title: 'Revisions',
      content: 'The materials appearing on williamstore AI may include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes at any time without prior notice.',
    },
    {
      title: 'Governing Law',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('termsOfService', language)}</h1>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Quick Summary */}
        <div className="card p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Quick Summary</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">Use the service for legal purposes</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">Keep your account secure</span>
            </div>
            <div className="flex items-start gap-2">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">Generate harmful or illegal content</span>
            </div>
            <div className="flex items-start gap-2">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">Share your account with others</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index} className="card p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <p className="text-slate-300 leading-relaxed">{section.content}</p>
          </div>
        ))}

        {/* Warning */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">Important</span>
          </div>
          Violation of these terms may result in immediate termination of your account and forfeiture of any purchased credits.
        </div>

        {/* Contact */}
        <div className="card p-8">
          <h2 className="text-xl font-semibold mb-4">Questions?</h2>
          <p className="text-slate-300">
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:legal@williamstore.top" className="text-blue-400 hover:underline">
              legal@williamstore.top
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
