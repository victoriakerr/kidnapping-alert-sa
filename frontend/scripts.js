const form = document.getElementById('reportForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    age: parseInt(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    photoUrl: document.getElementById('photoUrl').value,
    lastSeenLocation: document.getElementById('lastSeenLocation').value,
    contactNumber: document.getElementById('contactNumber').value
  };

  try {
    const response = await fetch('http://localhost:5000/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message || 'Report submitted!');
    form.reset();
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to submit report. Check backend console.');
  }
});
