import React, { useState } from "react";

const EmergencyButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const triggerSOS = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "SOS! Emergency assistance needed.",
          location: "Unknown", //i'll replace this with GPS later
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("SOS sent successfully!");
      } else {
        setMessage(data.error || "Failed to send SOS");
      }
    } catch (error) {
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button
        onClick={triggerSOS}
        disabled={loading}
        style={{
          background: "#dc2626",
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
          padding: "16px 28px",
          borderRadius: "50%",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          border: "none",
        }}
      >
        {loading ? "Sending..." : "SOS"}
      </button>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
};

export default EmergencyButton;
