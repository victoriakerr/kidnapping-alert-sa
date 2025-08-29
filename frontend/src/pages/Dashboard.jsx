import React, { useEffect, useState } from "react";
import { getAllAlerts } from "../utils/alertApi";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getAllAlerts();
      setAlerts(Array.isArray(data) ? data : []);
      setLoading(false);
    })();
  }, []);

  const Badge = ({ status = 'Missing' }) => {
    const s = (status || 'Missing').toLowerCase();
    const map = {
      missing: { background: '#dc2626' },
      found: { background: '#16a34a' },
      deceased: { background: '#6b7280' },
    };
    const style = map[s] || map.missing;
    return (
      <span style={{ ...style, color: '#fff', padding: '4px 8px', borderRadius: 8, fontSize: 12 }}>
        {status}
      </span>
    );
  };

  if (loading) return <p>Loading alerts...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alerts Dashboard</h1>
      {alerts.length === 0 ? (
        <p>No alerts found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Last Seen Location</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a._id} className="text-center">
                <td className="p-2 border">{[a?.name, a?.surname].filter(Boolean).join(' ') || '—'}</td>
                <td className="p-2 border">{a?.lastSeenLocation || 'Unknown'}</td>
                <td className="p-2 border"><Badge status={a?.status || 'Missing'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
