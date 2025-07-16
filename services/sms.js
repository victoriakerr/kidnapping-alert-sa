const axios = require('axios');

const sendAlertSMS = async (message, location) => {
    const clientId = process.env.SMSPORTAL_CLIENT_ID;
    const secret = process.env.SMSPORTAL_SECRET;

    const recipientsRaw = process.env.ALERT_RECIPIENT || '';
    const allRecipients = recipientsRaw.split(',').map(pair => {
        const [number, city] = pair.split(':');
        return {
            number: number.trim(),
            city: city.trim().toLowerCase(),
        };
    });

    // we match by city using LastSeenLocation 
    const normalisedLocation = location.toLowerCase();
    const recipientsToSend = allRecipients.filter(r => 
        normalisedLocation.includes(r.city)
    );

    if (recipientsToSend.length === 0) {
        console.warn('No recipients matched for location:', location);
        return;
    }

    const messages = recipientsToSend.map(r => ({
        content: message,
        destination: r.number
    }));
    
     try {
    const response = await axios.post(
      'https://rest.smsportal.com/v1/bulkmessages',
      { messages },
      {
        auth: {
          username: clientId,
          password: secret,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`SMS sent to ${recipientsToSend.length} recipient(s)`, response.data);
    return response.data;
  } catch (error) {
    console.error('SMS sending failed:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendAlertSMS;