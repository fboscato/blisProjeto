import { Router } from 'express';
import { getWeatherByCity } from '../service/weatherService';


export const weatherRoutes = Router();

weatherRoutes.get('/weather', async (req, res) => {
  const city = req.query.city as string;

  if (!city) {
    return res.status(400).json({ message: 'O parâmetro "city" é obrigatório.' });
  }

  try {
    const weatherData = await getWeatherByCity(city);
    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});
