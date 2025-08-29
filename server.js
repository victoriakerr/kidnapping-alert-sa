const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
 
dotenv.config();

const app = express();
app.use(cors({  origin: '*'}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const reportRoute = require('./routes/report');
app.use('/api/report', reportRoute);

const alertRoute = require('./routes/alerts');
app.use('/api/alerts', alertRoute);

const sosRoute = require('./routes/sos');
app.use('/api/sos', sosRoute);

const facialRoute = require('./routes/facialRecognition');
app.use('/api/facial-recognition', facialRoute);

app.get('/', (_req, res) => {
    res.send('Kidnapping Alert SA API is running.');
});

//MonoDB connection 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
