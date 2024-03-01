import fetch from "../include/fetch.js";

interface uniAPIobj {
  stateProvince: string | null;
  domains: string[];
  name: string;
  web_pages: string[];
  alpha_two_code: string[];
}

export function fetchUniversities(query: string): Promise<string[]> {
  return fetch(`http://220.maxkuechen.com/universities/search?name=${query}`)
    .then(response => response.json())
    .then((json: uniAPIobj[]) => {
      const uniArr: string[] = [];
      json.forEach(o => uniArr.push(o.name));
      return uniArr;
    });
}
