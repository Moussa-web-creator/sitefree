import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Layout } from './components/layout/Layout';
import { NotificationContainer } from './components/ui/Notification';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminLogin } from './pages/AdminLogin';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { VideoGenerator } from './pages/AITools';
import { ImageGenerator } from './pages/ImageGenerator';
import { WebsiteGenerator } from './pages/WebsiteGenerator';
import { AppGenerator } from './pages/AppGenerator';
import { AIAgents } from './pages/AIAgents';
import { Templates } from './pages/Templates';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Status } from './pages/Status';
import { Profile } from './pages/Profile';

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="video-generator" element={<VideoGenerator />} />
                  <Route path="image-generator" element={<ImageGenerator />} />
                  <Route path="website-generator" element={<WebsiteGenerator />} />
                  <Route path="app-generator" element={<AppGenerator />} />
                  <Route path="ai-agents" element={<AIAgents />} />
                  <Route path="templates" element={<Templates />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="status" element={<Status />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-login" element={<AdminLogin />} />
              </Routes>
              <NotificationContainer />
            </Suspense>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
