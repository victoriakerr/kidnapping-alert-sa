import React, { useEffect, useState } from 'react';
import AlertCard from '../components/AlertCard';
import { getAllAlerts } from '../utils/alertApi';

const ActiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getAllAlerts();
      setAlerts(Array.isArray(data) ? data : []);
      setLoading(false);
    })();
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
