import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, Segoe UI, Roboto, sans-serif' }}>
      {/* Top-left branding */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Kidnapping Alert SA</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>Emergency Response Assistant</p>
      </div>

      {/* Main header */}
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 36, margin: '0 0 8px', fontWeight: 900 }}>Kidnapping Alert SA</h2>
        <p style={{ fontSize: 18, margin: '6px 0', color: '#374151' }}>
          A community-driven emergency response system to help locate missing persons across South Africa.
        </p>
        <p style={{ fontSize: 18, margin: '0 0 16px', color: '#374151' }}>
          Every second counts when someone goes missing.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/report"
            style={{
              background: '#f59e0b',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Report Missing Person
          </a>
          <a
            href="/alerts"
            style={{
              background: '#111827',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            View Active Alerts
          </a>
        </div>
      </header>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
          gap: 16,
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 32, fontWeight: 900 }}>127</div>
          <div style={{ color: '#6b7280' }}>Reports Filed</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 32, fontWeight: 900 }}>&lt; 2 hours</div>
          <div style={{ color: '#6b7280' }}>Avg Response Time</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 32, fontWeight: 900 }}>89</div>
          <div style={{ color: '#6b7280' }}>People Found</div>
        </div>
      </div>

      {/* How It Works */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 16 }}>How It Works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <p style={{ fontWeight: 800, margin: '0 0 6px' }}>1. Report</p>
            <p style={{ margin: 0, color: '#4b5563' }}>
              Upload a photo and details of the missing person. Location is automatically detected.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <p style={{ fontWeight: 800, margin: '0 0 6px' }}>2. Alert</p>
            <p style={{ margin: 0, color: '#4b5563' }}>
              Your report is immediately visible to the community. People in the area are notified to be on the lookout.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <p style={{ fontWeight: 800, margin: '0 0 6px' }}>3. Reunite</p>
            <p style={{ margin: 0, color: '#4b5563' }}>
              Community members can report sightings or use our AI facial recognition to help identify missing persons.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#dc2626', margin: '0 0 8px' }}>Emergency Situation?</h3>
        <p style={{ margin: '0 0 12px', color: '#374151' }}>
          For immediate emergencies, contact the authorities first.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="tel:10111"
            style={{
              background: '#dc2626',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            SAPS: 10111
          </a>
          <a
            href="tel:112"
            style={{
              background: '#f59e0b',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Emergency: 112
          </a>
        </div>
      </section>

      {/* Footer blocks */}
      <footer style={{ borderTop: '1px solid #e5e7eb', paddingTop: 18, marginTop: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          <div>
            <h4 style={{ fontWeight: 800, margin: '0 0 8px' }}>Emergency Contacts</h4>
            <p style={{ margin: 0 }}>SAPS: 10111</p>
            <p style={{ margin: 0 }}>Emergency: 112</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, margin: '0 0 8px' }}>About</h4>
            <p style={{ margin: 0, color: '#4b5563' }}>
              A community-driven platform to help locate missing persons in South Africa. Every second counts.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 800, margin: '0 0 8px' }}>Contact</h4>
            <p style={{ margin: 0 }}>
              Email: <a href="mailto:help@kidnappalert.co.za">help@kidnappalert.co.za</a>
            </p>
            <p style={{ margin: '8px 0 0', color: '#4b5563' }}>Made with ❤️ for South African families</p>
            <p style={{ margin: 0, color: '#6b7280' }}>© 2025 Kidnapping Alert SA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
