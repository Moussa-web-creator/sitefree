import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  // Create profile
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      credits: 500,
      subscription_plan: 'free',
    });

    if (profileError) console.error('Profile creation error:', profileError);
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<{
  full_name: string;
  avatar_url: string;
}>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getGenerationHistory(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('generation_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function createGeneration(userId: string, type: string, prompt: string, credits: number) {
  const { data, error } = await supabase
    .from('generation_history')
    .insert({
      user_id: userId,
      generation_type: type,
      prompt,
      result_url: `https://api.williamstore.ai/generate/${type}/${Date.now()}`,
      credits_used: credits,
      status: 'completed',
    })
    .select()
    .single();

  if (error) throw error;

  // Deduct credits
  const { error: updateError } = await supabase.rpc('deduct_credits', {
    user_id_param: userId,
    credits_param: credits,
  });

  if (updateError) {
    // Manual deduction if RPC not available
    const profile = await getProfile(userId);
    if (profile) {
      await supabase
        .from('profiles')
        .update({ credits: Math.max(0, profile.credits - credits) })
        .eq('id', userId);
    }
  }

  return data;
}

export async function createPayment(userId: string, amount: number, method: string, planName: string, credits: number) {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      user_id: userId,
      amount,
      currency: 'USD',
      payment_method: method,
      payment_status: 'completed',
      plan_name: planName,
      credits_added: credits,
    })
    .select()
    .single();

  if (error) throw error;

  // Add credits
  const profile = await getProfile(userId);
  if (profile) {
    await supabase
      .from('profiles')
      .update({ credits: profile.credits + credits })
      .eq('id', userId);
  }

  return data;
}

export async function createContactMessage(name: string, email: string, subject: string, message: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name,
      email,
      subject,
      message,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateMessageStatus(messageId: string, status: string) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', messageId);

  if (error) throw error;
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select('*, profiles(email, full_name)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getSiteUpdates() {
  const { data, error } = await supabase
    .from('site_updates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createSiteUpdate(title: string, content: string, updateType: string) {
  const { data, error } = await supabase
    .from('site_updates')
    .insert({
      title,
      content,
      update_type: updateType,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSiteUpdate(id: string) {
  const { error } = await supabase
    .from('site_updates')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
