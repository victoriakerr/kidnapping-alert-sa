import React, { useEffect, useRef, useState } from 'react';
import { detectUserLocation } from '../utils/geolocation';
import { submitReport } from '../utils/alertApi';
import { loadFaceModels, imageToDescriptor } from '../lib/faceApi';

const initial = {
  name: '',
  surname: '',
  age: '',
  gender: 'Male', 
  contactNumber: '',
  photoUrl: '',
  lastSeenLocation: '',
  description: '', 
};

const ReportForm = () => {
  const [formData, setFormData] = useState(initial);
  const [preview, setPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const loc = await detectUserLocation();
        if (loc) setFormData(prev => ({ ...prev, lastSeenLocation: loc }));
      } catch (_) {}

      try { await loadFaceModels(); } catch (e) { console.warn('Face models failed to load', e); }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
      const base64 = reader.result;
      setFormData(prev => ({ ...prev, photoUrl: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let faceDescriptor = null;
      if (preview && imgRef.current) {
        try {
          faceDescriptor = await imageToDescriptor(imgRef.current);
          if (!faceDescriptor) {
            const proceed = window.confirm('No face detected in the photo. Submit anyway?');
            if (!proceed) { setSubmitting(false); return; }
          }
        } catch {
          
        }
      }

      const payload = { 
        ...formData, 
        age: Number(formData.age) || 0, 
        faceDescriptor: faceDescriptor || []
      };

      const out = await submitReport(payload);

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

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input name="lastSeenLocation" placeholder="Last Seen Location" value={formData.lastSeenLocation} onChange={handleChange} required />
      </div>

      <div style={{ marginTop: 14 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Description</label>
        <textarea
          name="description"
          placeholder="Describe the person (clothes, skin color, etc.)"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginTop: 14 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Attach Photo (optional)</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview ? (
          <div style={{ marginTop: 10 }}>
            <img
              ref={imgRef}
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
