 
KidnappingAlertSA/
---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/victoriakerr/kidnapping-alert-sa.git
cd KidnappingAlertSA

2. Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGODB_URI=your_mongo_uri
SMSPORTAL_CLIENT_ID=your_client_id
SMSPORTAL_SECRET=your_secret_password
ALERT_RECIPIENT=number:pronvince
LOCATIONIQ_API_KEY=


Start the backend server:

npm run dev

3. Frontend Setup
cd frontend
npm install


Add .env variables:

REACT_APP_LOCATIONIQ_KEY=your_locationiq_api_key
REACT_APP_BACKEND_URL=http://localhost:5000


Start the React app:

npm start

Usage

Open your browser at http://localhost:3000.

Navigate to Report Missing to submit a missing person report.

Click the SOS button in an emergency to notify authorities and nearby users.

View Active Alerts to see ongoing reports with last seen locations on the map.

Use Facial Recognition to search for missing persons by uploading a photo.


Contact

Developer: Zandile Victoria Kerr

Email: vickykerr20@gmail.com

LinkedIn: linkedin.com/in/zandilekerr

Disclaimer: This system is designed for public safety and rapid response to missing person cases. It does not track criminal records or personal data beyond what is necessary for emergency alerts.