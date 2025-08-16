import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ReportMissing from './pages/ReportMissing';
import ActiveAlerts from './pages/ActiveAlerts';

function App() {
  return (
    <Router>
      {/* simple top nav to avoid icon deps */}
      <nav style={{ background: '#111827', padding: 12 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 12 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Home</Link>
          <Link to="/report" style={{ color: '#fff', textDecoration: 'none' }}>Report</Link>
          <Link to="/alerts" style={{ color: '#fff', textDecoration: 'none' }}>Alerts</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportMissing />} />
        <Route path="/alerts" element={<ActiveAlerts />} />
      </Routes>
    </Router>
  );
}

export default App;
