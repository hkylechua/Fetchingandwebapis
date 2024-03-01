import fetch from "../include/fetch.js";

interface StringGeoCoord {
  lat: string;
  lon: string;
  display_name: string;
}

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function getGeoData(query: string): Promise<StringGeoCoord> {
  return fetch(`https://220.maxkuechen.com/geoCoord/search?q=${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("No results found for query.");
      }
      return response.json();
    })
    .then((json: StringGeoCoord[]) =>
      Array.isArray(json) && json.length > 0
        ? Promise.resolve(json[0])
        : Promise.reject(new Error("No results found for query."))
    );
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  return getGeoData(query).then((geo: StringGeoCoord) => ({
    lat: Number.parseFloat(geo.lat),
    lon: Number.parseFloat(geo.lon),
  }));
}
