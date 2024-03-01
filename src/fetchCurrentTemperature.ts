import { GeoCoord } from "./fetchGeoCoord.js";
import fetch from "../include/fetch.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  // TODO
  const url = `https://220.maxkuechen.com/currentTemperature/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&temperature_unit=fahrenheit`;

  return fetch(url)
    .then(response => response.json())
    .then(
      (res: {
        hourly: {
          time: string[];
          temperature_2m: number[];
        };
      }) => ({
        time: res.hourly.time,
        temperature_2m: res.hourly.temperature_2m,
      })
    );
}
