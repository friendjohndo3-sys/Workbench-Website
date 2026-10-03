import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useContent } from '../context/ContentContext';
import { MaintenanceScreen } from './MaintenanceScreen';

export const PublicLayout: React.FC = () => {
  const { content } = useContent();

  if (content.settings.maintenanceMode) {
    return <MaintenanceScreen />;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#0e3052]/15 selection:text-[#0b2138]">
      {/* Blueprint-styled Header on public pages */}
      <Header />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Consistent Footer on public pages */}
      <Footer />
    </div>
  );
};
