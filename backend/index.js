// server.js (Main Entry Point)
const express = require('express');
const app = express();

// 1. Import your separate route files
const analysisRoutes = require('./routes/analysisRoutes'); // YOUR FILE
// const userRoutes = require('./routes/userRoutes');         // THEIR FILE

// 2. Map them to prefixes
app.use('/api/analysis', analysisRoutes);
// app.use('/api/users', userRoutes);

app.listen(3000, () => console.log("Server running!"));