// 1. Core Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 2. Initialize Environment Variables
// This must be done before any routes or DB connections that use them


// 3. MVC Module Imports
const { connectDB } = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// 4. Database Connection
connectDB();

// 5. Global Middleware
app.use(cors());
app.use(express.json());

// 6. Route Mapping
app.use('/doctor', doctorRoutes);        // Handles Signup/Login logic
app.use('/api/analysis', analysisRoutes); // Handles VCF Parsing & Gemini RAG

// 7. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Unified PharmaGuard Server live @ ${PORT}`);
});