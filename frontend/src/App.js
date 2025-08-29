import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ReportMissing from './pages/ReportMissing';
import ActiveAlerts from './pages/ActiveAlerts';
import FacialRecognition from './pages/FacialRecognition';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <nav style={{ background: '#111827', padding: 12 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 12 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Home</Link>
          <Link to="/report" style={{ color: '#fff', textDecoration: 'none' }}>Report</Link>
          <Link to="/alerts" style={{ color: '#fff', textDecoration: 'none' }}>Alerts</Link>
          <Link to="/facial-recognition" style={{color: '#fff', textDecoration: 'none' }}>AI Match</Link>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportMissing />} />
        <Route path="/alerts" element={<ActiveAlerts />} />
        <Route path="/facial-recognition" element={<FacialRecognition />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
