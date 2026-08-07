import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, MobileMenuButton } from './Sidebar';
import { Footer } from './Footer';
import { CookieConsent } from '../ui/CookieConsent';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileMenuButton onClick={() => setSidebarOpen(true)} />

      <main className="main-content flex-1 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>

      <CookieConsent />
    </div>
  );
}
