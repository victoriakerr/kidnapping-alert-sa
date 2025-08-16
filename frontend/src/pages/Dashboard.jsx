import React, { useEffect, useState } from "react";
import { getAllAlerts } from "../utils/alertApi";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      const data = await getAllAlerts();
      setAlerts(data);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  const getStatusBadge = (status) => {
    let color = "";
    if (status.toLowerCase() === "missing") color = "bg-red-600";
    if (status.toLowerCase() === "found") color = "bg-green-600";
    if (status.toLowerCase() === "deceased") color = "bg-gray-800";
    return (
      <span className={`text-white px-2 py-1 rounded text-sm ${color}`}>
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
            {alerts.map((alert) => (
              <tr key={alert.id} className="text-center">
                <td className="p-2 border">{alert.name}</td>
                <td className="p-2 border">{alert.lastSeen || "Unknown"}</td>
                <td className="p-2 border">{getStatusBadge(alert.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
