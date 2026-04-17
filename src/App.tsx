/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HUDLayout } from './components/HUD/HUDLayout';
import { Navigation } from './components/HUD/Navigation';
import { Home } from './pages/Home';
import { Links } from './pages/Links';
import { Tournaments } from './pages/Tournaments';
import { YouTube } from './pages/YouTube';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <HUDLayout>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/links" element={<Links />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Routes>
      </HUDLayout>
    </Router>
  );
}
