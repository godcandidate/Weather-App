import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;
const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

app.use(cors());

app.get('/weather/:city', async (req: Request, res: Response) => {
    const city = req.params.city;
    try {
        const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: "Invalid city name" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
