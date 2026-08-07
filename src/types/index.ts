export type Language = 'en' | 'ar' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  credits: number;
  free_credits_last_awarded: string;
  subscription_plan: 'free' | 'basic' | 'pro';
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string | null;
  amount: number;
  currency: string;
  payment_method: 'credit_card' | 'paypal' | 'vodafone_cash' | 'bybit';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id: string | null;
  plan_name: string;
  credits_added: number;
  created_at: string;
}

export interface GenerationHistory {
  id: string;
  user_id: string;
  generation_type: 'video' | 'image' | 'website' | 'app' | 'agent';
  prompt: string;
  result_url: string | null;
  credits_used: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface SiteAnalytics {
  id: string;
  page_name: string;
  visitor_count: number;
  date: string;
}

export interface SiteUpdate {
  id: string;
  title: string;
  content: string;
  update_type: 'info' | 'warning' | 'error' | 'success';
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  credits: number;
  features: string[];
  popular?: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  template_data: string;
  is_premium: boolean;
}
