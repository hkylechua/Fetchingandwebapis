import { fetchUniversities } from "../src/fetchUniversities.js";
import { fetchGeoCoord } from "../src/fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  return fetchUniversities(universityQuery)
    .then(universities => {
      if (universities.length === 0) {
        throw new Error("No results found for query.");
      }
      return Promise.all(
        universities.map(university =>
          fetchGeoCoord(transformName === undefined ? university : transformName(university)).then(coordinate =>
            fetchCurrentTemperature(coordinate).then(weather => ({
              name: university,
              avg: weather.temperature_2m.reduce((acc, cur) => acc + cur, 0) / weather.temperature_2m.length,
            }))
          )
        )
      );
    })
    .then(universityWeathers => {
      const result: AverageTemperatureResults = {
        totalAverage: 0,
      };

      for (const university of universityWeathers) {
        result[university.name] = university.avg;
        result.totalAverage += university.avg;
      }

      result.totalAverage /= universityWeathers.length;

      return result;
    });
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of Massachusetts at Amherst", (x: string) => x.replace("at", "").trim());
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of California");
}
