const axios = require('axios');
const { raw } = require('express');

const sendAlertSMS = async (message, location) => {
    const clientId = process.env.SMSPORTAL_CLIENT_ID;
    const secret = process.env.SMSPORTAL_SECRET;

    const recipientsRaw = process.env.ALERT_RECIPIENT || '';
    const allRecipients = recipientsRaw.split(',').map(pair => {
        const [number, city] = pair.split(':');
        return { number: number.trim(), city: (city || '').trim().toLowerCase() };   
    }).filter(r => r.number);
 
    const normalisedLocation = (location || '').toLowerCase();
    const recipientsToSend = allRecipients.filter(r => normalisedLocation.includes(r.city)
    );

    if (recipientsToSend.length === 0) {
        console.warn('No recipients matched for location:', location);
        return { accepted: 0, failed: 0, raw: { warning: 'No reciept matched for location' } };
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
        timeout: 10000,
      }
    );

    const raw = response.data || {};
    const messageId = raw?.batchId || raw?.id || undefined;
    const accepted = raw?.acceptedCount ?? raw?.accepted ?? recipientsToSend.length;
    const failed = raw?.failedCount ?? raw?.failed ?? 0;

    console.log(`SMS sent to ${recipientsToSend.length} recipient(s)`, raw);
    return { messageId, accepted, failed, raw };
  } catch (error) {
    const raw = error?.response?.data || { error: error.message };
    console.error('SMS sending failed:', raw);
    return { messageId: undefined, accepted: 0, failed: recipientsToSend.length, raw };
  }
};

module.exports = sendAlertSMS;