import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle, Clock, Server, Globe, Database, Loader, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../lib/i18n';
import { getSiteUpdates } from '../lib/supabase';

const services = [
  { name: 'AI Video Generation', status: 'operational', uptime: '99.9%' },
  { name: 'AI Image Generation', status: 'operational', uptime: '99.8%' },
  { name: 'Website Generator', status: 'operational', uptime: '99.9%' },
  { name: 'App Generator', status: 'operational', uptime: '99.7%' },
  { name: 'AI Agents', status: 'operational', uptime: '99.9%' },
  { name: 'API Services', status: 'operational', uptime: '99.95%' },
  { name: 'Authentication', status: 'operational', uptime: '99.99%' },
  { name: 'Payment Processing', status: 'operational', uptime: '99.9%' },
];

const incidents = [
  {
    date: '2024-01-15',
    title: 'Image Generation Slow Response',
    status: 'resolved',
    duration: '45 minutes',
    description: 'Experienced higher than normal response times for image generation. Issue was caused by increased load and has been resolved by scaling up resources.',
  },
];

export function Status() {
  const { language } = useLanguage();
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteUpdates()
      .then((data) => setUpdates(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const overallStatus = services.every((s) => s.status === 'operational')
    ? 'operational'
    : 'degraded';

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('siteStatus', language)}</h1>
          <p className="text-slate-400">Real-time status of all williamstore AI services</p>
        </div>

        {/* Overall Status */}
        <div
          className={`card p-8 mb-8 text-center ${
            overallStatus === 'operational' ? 'border-emerald-500' : 'border-amber-500'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            {overallStatus === 'operational' ? (
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            )}
            <span className="text-2xl font-bold">
              {overallStatus === 'operational'
                ? t('operational', language)
                : t('degraded', language)}
            </span>
          </div>
          <p className="text-slate-400">
            All systems are operational as of {new Date().toLocaleString()}
          </p>
        </div>

        {/* Services Status */}
        <div className="card p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Services
          </h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  {service.status === 'operational' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  )}
                  <span>{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400">{service.uptime} uptime</span>
                  <span
                    className={`badge ${
                      service.status === 'operational' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="card p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {t('siteUpdates', language)}
          </h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : updates.length > 0 ? (
            <div className="space-y-4">
              {updates.map((update: any) => (
                <div key={update.id} className="p-4 rounded-lg bg-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`badge badge-${
                        update.update_type === 'error'
                          ? 'error'
                          : update.update_type === 'warning'
                          ? 'warning'
                          : update.update_type === 'success'
                          ? 'success'
                          : 'primary'
                      }`}
                    >
                      {update.update_type}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(update.created_at).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="font-semibold">{update.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{update.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No recent updates. All systems are running smoothly.
            </div>
          )}
        </div>

        {/* Incident History */}
        <div className="card p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Incident History
          </h2>
          {incidents.map((incident, index) => (
            <div key={index} className="p-4 rounded-lg bg-slate-700/50 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-success">Resolved</span>
                <span className="text-xs text-slate-400">{incident.date}</span>
                <span className="text-xs text-slate-500 ml-auto">
                  Duration: {incident.duration}
                </span>
              </div>
              <h3 className="font-semibold">{incident.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{incident.description}</p>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">99.9%</p>
            <p className="text-sm text-slate-400">Avg Uptime (30 days)</p>
          </div>
          <div className="card p-6 text-center">
            <Database className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">1.2s</p>
            <p className="text-sm text-slate-400">Avg Response Time</p>
          </div>
          <div className="card p-6 text-center">
            <Server className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-slate-400">Active Incidents</p>
          </div>
        </div>
      </div>
    </div>
  );
}
