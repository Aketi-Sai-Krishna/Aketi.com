
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import PreviousWork from './pages/PreviousWork';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './components/Contact';

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* All previous work */}
      <Route path="/previous-work" element={<PreviousWork />} />

      {/* Support old project URLs by redirecting to the new URL */}
      <Route
        path="/previous-work/:slug"
        element={<LegacyProjectRedirect />}
      />

      {/* Service details */}
      <Route
        path="/services/websites-digital-platforms"
        element={<ServiceDetail />}
      />
      <Route
        path="/services/dashboards-business-systems"
        element={<ServiceDetail />}
      />
      <Route
        path="/services/workflow-automation"
        element={<ServiceDetail />}
      />

      {/* Contact */}
      <Route path="/contact" element={<Contact />} />

      {/* Individual project details */}
      <Route path="/:slug" element={<ProjectDetail />} />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function LegacyProjectRedirect() {
  // This keeps previously shared project URLs working.
  const slug = window.location.pathname.split('/').pop();

  return <Navigate to={`/${slug}`} replace />;
}
