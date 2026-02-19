require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analysisRoutes = require('./routes/analysisRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/analysis', analysisRoutes);

app.listen(3000, () => console.log('🚀 AI Engine Ready on Port 3000'));