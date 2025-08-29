const axios = require('axios');

async function geocodeAddress(address) {
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    try {
        const res = await axios.get('https://us1.locationiq.com/v1/search.php', {
            params: { key: apiKey, q: address, format: 'json' },
            timeout: 8000,
        });
        if (Array.isArray(res.data) && res.data[0]) {
            return {
                lat: parseFloat(res.data[0].lat),
                lng: parseFloat(res.data[0].lon),
            };
        }
    } catch (err) {
        console.error('Geocoding failed:', err?.message || err);
    }
    return null;
}

module.exports = geocodeAddress;