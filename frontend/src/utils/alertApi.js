const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getAllAlerts = async () => {
  try {
    const res = await fetch(`${API}/api/report`);
    const out = await res.json().catch(() => (null));

    if (!res.ok) {
      const reason =
        out?.error ||
        (out?.errors ? out.errors.map(e => e.msg || e.message || String(e)).join(', ') : '') ||
        `HTTP ${res.status}`;
      throw new Error(reason || 'Failed to fetch alerts');
    }

    return Array.isArray(out) ? out : (out?.data ?? []);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    return [];
  }
};


export const submitReport = async (payload) => {
  const res = await fetch(`${API}/api/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const out = await res.json().catch(() => (null));

  if (!res.ok) {
    const details = out?.errors
      ? out.errors.map(e => e.msg || e.message || JSON.stringify(e)).join('\n')
      : (out?.error || 'Submit failed');
    throw new Error(details);
  }

  return out;
};

export const facialMatch = async (descriptor) => {
  const res = await fetch(`${API}/api/facial-recognition`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ faceDescriptor: descriptor }),
  });

  const out = await res.json().catch(() => (null));

  if (!res.ok) {
    const details = out?.error || 'Match failed';
    throw new Error(details);
  }
  return out;
};
