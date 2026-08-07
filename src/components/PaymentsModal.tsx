import React, { useState } from 'react';
import { X, CreditCard, Wallet, Smartphone, Bitcoin, Check, Loader, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { createPayment } from '../lib/supabase';
import { t } from '../lib/i18n';

interface PaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: {
    id: string;
    name: string;
    price: number;
    credits: number;
  };
}

type PaymentMethod = 'credit_card' | 'paypal' | 'vodafone_cash' | 'bybit';

const paymentMethods: { id: PaymentMethod; name: string; icon: React.ReactNode }[] = [
  { id: 'credit_card', name: 'Credit Card', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'paypal', name: 'PayPal', icon: <Wallet className="w-5 h-5" /> },
  { id: 'vodafone_cash', name: 'Vodafone Cash', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'bybit', name: 'Bybit', icon: <Bitcoin className="w-5 h-5" /> },
];

export function PaymentsModal({ isOpen, onClose, plan }: PaymentsModalProps) {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { language } = useLanguage();
  const [method, setMethod] = useState<PaymentMethod>('credit_card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedPlan = plan || {
    id: 'credits',
    name: 'Credit Purchase',
    price: 10,
    credits: 1000,
  };

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (method === 'credit_card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (!formData.expiry || !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiry)) {
        newErrors.expiry = 'Invalid expiry date (MM/YY)';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'Invalid CVV';
      }
      if (!formData.name || formData.name.length < 2) {
        newErrors.name = 'Name is required';
      }
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setLoading(true);
    try {
      await createPayment(
        user.id,
        selectedPlan.price,
        method,
        selectedPlan.name,
        selectedPlan.credits
      );
      setSuccess(true);
      showNotification('success', t('paymentSuccessful', language));
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      showNotification('error', t('paymentFailed', language));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal p-8 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t('paymentSuccessful', language)}</h2>
          <p className="text-slate-400">Your credits have been added to your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold">{t('paymentMethod', language)}</h2>
            <p className="text-sm text-slate-400">
              {selectedPlan.name} - ${selectedPlan.price}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Payment Methods */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setMethod(pm.id)}
                className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  method === pm.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {pm.icon}
                <span className="text-sm font-medium">{pm.name}</span>
              </button>
            ))}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="label">{t('email', language)}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Credit Card Fields */}
          {method === 'credit_card' && (
            <>
              <div className="mb-4">
                <label className="label">{t('cardNumber', language)}</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })
                  }
                  className={`input ${errors.cardNumber ? 'input-error' : ''}`}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label">{t('expiryDate', language)}</label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) =>
                      setFormData({ ...formData, expiry: formatExpiry(e.target.value) })
                    }
                    className={`input ${errors.expiry ? 'input-error' : ''}`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiry && <p className="error-text">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="label">{t('cvv', language)}</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })
                    }
                    className={`input ${errors.cvv ? 'input-error' : ''}`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">{t('cardHolder', language)}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
            </>
          )}

          {/* Other payment method info */}
          {method !== 'credit_card' && (
            <div className="p-4 rounded-lg bg-slate-700/50 mb-4">
              <p className="text-sm text-slate-300 mb-2">
                You will be redirected to complete payment via {paymentMethods.find((m) => m.id === method)?.name}.
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs mb-6">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Order Summary */}
          <div className="p-4 rounded-lg bg-slate-700/50 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">{selectedPlan.name}</span>
              <span className="font-semibold">${selectedPlan.price}.00</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Total</span>
              <span className="text-white font-semibold">${selectedPlan.price}.00</span>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading || !user} className="btn btn-primary w-full btn-lg">
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {t('payNow', language)} - ${selectedPlan.price}
              </>
            )}
          </button>

          {!user && (
            <p className="text-center text-sm text-amber-400 mt-4">
              Please log in to make a purchase
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
