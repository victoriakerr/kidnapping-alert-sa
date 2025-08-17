import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertCard from '../components/AlertCard';

const ActiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/report');
        
        setAlerts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ color: '#dc2626' }}>Active Missing Person Alerts</h2>

      {loading ? (
        <p>Loading…</p>
      ) : alerts.length === 0 ? (
        <p>No active alerts at the moment.</p>
      ) : (
        <div
          className="alerts-grid"
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {alerts.map((a, idx) => (
            <AlertCard key={a._id || idx} data={a} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveAlerts;
