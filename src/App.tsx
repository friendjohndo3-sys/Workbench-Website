/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Multi-page routes
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { DocsPage } from './pages/DocsPage';
import { WbScriptDocsPage } from './pages/WbScriptDocsPage';
import { WbVisualDocsPage } from './pages/WbVisualDocsPage';
import { DownloadPage } from './pages/DownloadPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { UpdatesPage } from './pages/UpdatesPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#0e3052]/15 selection:text-[#0b2138]">
        {/* Blueprint-styled Header on all pages */}
        <Header />

        {/* Main Routed Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/wbscript" element={<WbScriptDocsPage />} />
            <Route path="/docs/wbvisual" element={<WbVisualDocsPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Consistent Footer across all pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
