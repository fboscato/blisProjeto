import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  rainProbability?: number;
  condition: string;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Para retornar a temperatura em Celsius
        lang: 'pt_br',   // Para descrição do clima em português
      },
    });

    const { main, weather, wind, rain } = response.data;

    return {
      temperature: main.temp,
      windSpeed: wind.speed,
      rainProbability: rain?.['1h'] || 0, // Milímetros de chuva na última hora
      condition: weather[0].description,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    throw new Error('Erro ao buscar dados do clima.');
  }
}
