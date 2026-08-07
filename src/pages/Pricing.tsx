import React, { useState } from 'react';
import { CreditCard, Check, Zap, Shield, Gift, Clock, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import { t } from '../lib/i18n';
import { PaymentsModal } from '../components/PaymentsModal';

const plans = [
  {
    id: 'free',
    name: 'freePlan',
    price: 0,
    credits: 500,
    features: [
      '500 free credits',
      '500 bonus credits every 10 days',
      'Access to all AI tools',
      'Standard queue',
      'Community support',
    ],
    popular: false,
  },
  {
    id: 'basic',
    name: 'basicPlan',
    price: 1,
    credits: 5000,
    features: [
      '5,000 credits per month',
      'Priority queue access',
      'High resolution outputs',
      'API access',
      'Email support',
      'No watermark',
    ],
    popular: true,
  },
  {
    id: 'pro',
    name: 'proPlan',
    price: 2,
    credits: -1,
    features: [
      'Unlimited credits',
      'Highest priority queue',
      '4K resolution outputs',
      'Full API access',
      'Priority support',
      'Custom models',
      'White-label options',
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: 'What are credits?',
    answer: 'Credits are used to generate content. Each tool uses a different amount of credits (e.g., 5 for images, 10 for videos).',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Do credits roll over?',
    answer: 'Free credits reset every 10 days. Basic plan credits reset monthly. Pro users have unlimited credits.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit cards, PayPal, Vodafone Cash, and Bybit cryptocurrency payments.',
  },
];

export function Pricing() {
  const { user, profile } = useAuth();
  const { language } = useLanguage();
  const { showNotification } = useNotification();
  const [showPayments, setShowPayments] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.id === 'free') {
      showNotification('info', 'You are on the Free plan');
      return;
    }
    setSelectedPlan(plan);
    setShowPayments(true);
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('pricing', language)}</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Choose the plan that fits your needs. Start free, upgrade when you're ready.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card p-8 relative ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{t(plan.name, language)}</h3>
              <p className="text-slate-400 mb-4">
                {plan.credits === -1 ? 'Unlimited' : `${plan.credits.toLocaleString()} credits`}
                {plan.id !== 'free' && '/month'}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                {plan.price > 0 && (
                  <span className="text-slate-400">{t('perMonth', language)}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={plan.id === 'free' && profile?.subscription_plan === 'free'}
                className={`btn w-full ${
                  plan.popular ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {plan.id === profile?.subscription_plan
                  ? t('currentPlan', language)
                  : plan.price === 0
                  ? 'Get Started'
                  : t('choosePlan', language)}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card p-8 mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">Why Choose williamstore AI?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-1">Lightning Fast</h3>
              <p className="text-sm text-slate-400">Generate in seconds, not minutes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-sm text-slate-400">Your data is encrypted and private</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-1">Free Credits</h3>
              <p className="text-sm text-slate-400">Get 500 bonus credits every 10 days</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold mb-1">24/7 Available</h3>
              <p className="text-sm text-slate-400">Access anytime, anywhere</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-slate-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Accepted Payment Methods</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-lg bg-slate-700">Credit Card</div>
            <div className="px-6 py-3 rounded-lg bg-slate-700">PayPal</div>
            <div className="px-6 py-3 rounded-lg bg-slate-700">Vodafone Cash</div>
            <div className="px-6 py-3 rounded-lg bg-slate-700">Bybit</div>
          </div>
        </div>
      </div>

      {selectedPlan && (
        <PaymentsModal
          isOpen={showPayments}
          onClose={() => setShowPayments(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
}
