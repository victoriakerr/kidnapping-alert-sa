import React, { useEffect, useState } from 'react';
import { detectUserLocation } from '../utils/geolocation';

const initial = {
  name: '',
  surname: '',
  age: '',
  gender: '',
  contactNumber: '',
  photoUrl: '',          // will store base64 data URL
  lastSeenLocation: '',
};

const ReportForm = () => {
  const [formData, setFormData] = useState(initial);
  const [preview, setPreview] = useState(''); // for image preview
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const loc = await detectUserLocation();
        setFormData(prev => ({ ...prev, lastSeenLocation: loc || '' }));
      } catch {
        // ignore
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // handle file selection (convert to base64 and store in photoUrl)
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      alert('Please select a JPG/PNG/WEBP image.');
      e.target.value = '';
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert('Image must be under 4MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result; // data URL
      setFormData(prev => ({ ...prev, photoUrl: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const out = await res.json();
      if (!res.ok) throw new Error(out?.error || 'Failed to submit');

      alert(out?.message || 'Report submitted');
      setFormData(initial);
      setPreview('');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to submit report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 16, color: '#dc2626' }}>Report a Missing Person</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
        <input name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input name="lastSeenLocation" placeholder="Last Seen Location" value={formData.lastSeenLocation} onChange={handleChange} />
      </div>

      {/* Photo picker */}
      <div style={{ marginTop: 14 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Attach Photo</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview ? (
          <div style={{ marginTop: 10 }}>
            <img
              src={preview}
              alt="Preview"
              style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 12, border: '1px solid #e5e7eb' }}
            />
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          marginTop: 16,
          background: '#dc2626',
          color: '#fff',
          border: 'none',
          padding: '10px 18px',
          borderRadius: 8,
          fontWeight: 700,
          cursor: 'pointer',
          opacity: submitting ? 0.8 : 1,
        }}
      >
        {submitting ? 'Sending…' : 'Send Alert'}
      </button>
    </form>
  );
};

export default ReportForm;
