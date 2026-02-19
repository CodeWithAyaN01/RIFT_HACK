import express from 'express';
const PORT = process.env.PORT ?? 8000
const app = express()

app.use(express.json());

app.listen(PORT, () => {
    console.log(`The server is live @ ${PORT}`)
})