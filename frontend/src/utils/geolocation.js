export async function detectUserLocation() {
  const LOCATIONIQ_API_KEY = process.env.REACT_APP_LOCATIONIQ_API_KEY;

  const getGPSLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject('Geolocation not supported');
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

  try {
    const position = await getGPSLocation();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data.display_name || `${lat}, ${lon}`;
  } catch (gpsError) {
    console.warn('GPS failed, using IP as fallback:', gpsError.message);

    try {
      const res = await fetch('https://ipapi.co/json');
      const data = await res.json();
      return `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (ipError) {
      console.error('IP-based location failed:', ipError.message);
      return 'Unknown Location';
    }
  }
}
