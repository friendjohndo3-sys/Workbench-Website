/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { PublicLayout } from './components/PublicLayout';
import { ProtectedRoute } from './components/dev/ProtectedRoute';
import { DevLayout } from './components/dev/DevLayout';

// Public pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { DocsPage } from './pages/DocsPage';
import { WbScriptDocsPage } from './pages/WbScriptDocsPage';
import { WbVisualDocsPage } from './pages/WbVisualDocsPage';
import { DownloadPage } from './pages/DownloadPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { UpdatesPage } from './pages/UpdatesPage';
import { LegalPage } from './pages/LegalPage';

// Developer Panel pages
import { DevLoginPage } from './pages/dev/DevLoginPage';
import { DevDashboardPage } from './pages/dev/DevDashboardPage';
import { DevWebsitePage } from './pages/dev/DevWebsitePage';
import { DevDownloadsPage } from './pages/dev/DevDownloadsPage';
import { DevUpdatesPage } from './pages/dev/DevUpdatesPage';
import { DevDocsPage } from './pages/dev/DevDocsPage';
import { DevShowcasePage } from './pages/dev/DevShowcasePage';
import { DevAssetsPage } from './pages/dev/DevAssetsPage';
import { DevSettingsPage } from './pages/dev/DevSettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Developer Login */}
            <Route path="/dev/login" element={<DevLoginPage />} />

            {/* Protected Developer Panel */}
            <Route
              path="/dev"
              element={
                <ProtectedRoute>
                  <DevLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dev/dashboard" replace />} />
              <Route path="dashboard" element={<DevDashboardPage />} />
              <Route path="website" element={<DevWebsitePage />} />
              <Route path="downloads" element={<DevDownloadsPage />} />
              <Route path="updates" element={<DevUpdatesPage />} />
              <Route path="docs" element={<DevDocsPage />} />
              <Route path="showcase" element={<DevShowcasePage />} />
              <Route path="assets" element={<DevAssetsPage />} />
              <Route path="settings" element={<DevSettingsPage />} />
            </Route>

            {/* Public Workbench Website */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/wbscript" element={<WbScriptDocsPage />} />
              <Route path="/docs/wbvisual" element={<WbVisualDocsPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/updates" element={<UpdatesPage />} />
              <Route path="/legal" element={<LegalPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}
