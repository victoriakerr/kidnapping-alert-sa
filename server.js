const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Loading envir variablrs 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//base routes here
const reportRoute = require('./routes/report');
app.use('/api/report', reportRoute);

app.get('/', (req, res) => {
    res.send('Kidnapping Alert SA API is running.');
});

//MonoDB connection 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


//Now lets start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
