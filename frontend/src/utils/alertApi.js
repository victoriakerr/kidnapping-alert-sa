export const fetchAlerts = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/report');
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return await res.json();
  } catch (err) {
    console.error('Error fetching alerts:', err);
    return [];
  }
};
