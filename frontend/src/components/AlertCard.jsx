import React from 'react';

const AlertCard = ({ data }) => {
  if (!data) return null;

  const {
    _id,
    name = '',
    surname = '',
    age = '',
    gender = '',
    photoUrl = '',
    lastSeenLocation = '',
    contactNumber = '',
    reportedAt,
    status = 'Missing', // expected values: 'Missing' | 'found' | 'Deceased'
  } = data;

  const fullName = [name, surname].filter(Boolean).join(' ');
  const dateStr = reportedAt ? new Date(reportedAt).toLocaleDateString() : '—';

  const statusStyles = {
    missing: { background: '#dc2626', color: '#fff', label: 'MISSING' }, 
    found: { background: '#16a34a', color: '#fff', label: 'FOUND' },
    deceased: { background: '#f59e0b', color: '#fff', label: 'DECEASED' }, 
    default: { background: '#6b7280', color: '#fff', label: (status || 'MISSING').toUpperCase() },
  };
  const badge = statusStyles[status] || statusStyles.default;

  return (
    <div
      className="alert-card"
      style={{
        background: '#fff',
        border: '1px solid #ef4444',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }}
    >
      {/* Top */}
      <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            ...badge,
            fontSize: 12,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 999,
          }}
        >
          {badge.label}
        </span>
        <span style={{ fontSize: 12, color: '#6b7280' }}>#{_id?.slice(-5) || '—'}</span>
      </div>

      {/* Body */}
      <div style={{ padding: 16, display: 'flex', gap: 16 }}>
        {/* Photo */}
        <div style={{ flexShrink: 0 }}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={fullName || 'Missing person photo'}
              style={{
                width: 96,
                height: 96,
                objectFit: 'cover',
                borderRadius: 12,
                border: '2px solid rgba(220,38,38,0.25)',
              }}
            />
          ) : (
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                background: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontWeight: 700,
              }}
            >
              N/A
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            title={fullName}
          >
            {fullName || 'Unknown'}
          </h3>
          <p style={{ margin: '6px 0', fontSize: 14, color: '#4b5563' }}>
            {age ? `${age} years` : '—'} {gender ? `• ${gender}` : ''}
          </p>
          <p style={{ margin: '4px 0', fontSize: 14, color: '#4b5563' }}>
            <strong>Last Seen:</strong> {lastSeenLocation || '—'}
          </p>
          <p style={{ margin: '4px 0', fontSize: 12, color: '#6b7280' }}>
            Reported: {dateStr}
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {contactNumber ? (
              <a
                href={`tel:${contactNumber}`}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '8px 10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#111827',
                  background: '#fff',
                }}
              >
                Call
              </a>
            ) : null}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Missing: ${fullName}`,
                    text: `Please help find ${fullName} (${age || '?'}), last seen at ${lastSeenLocation || 'unknown'}.`,
                    url: window.location.href,
                  });
                } else {
                  alert('Sharing is not supported on this device.');
                }
              }}
              style={{
                flex: 1,
                padding: '8px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                fontWeight: 600,
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
