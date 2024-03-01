/*
    This program prompts the user to input an anime name. It then sends a request to the Anilist API to fetch information
    about the anime including its title, description, average score, and genres. It also includes a removeHTMLTags function
    to cleanup the description by removing any HTML tags. If the anime is found, it prints the information to the console,
    if not, it prints an error message. The process repeats, asking the user for another anime name
    until the user manually quits (Ctrl+C to exit). 
*/

import * as readline from "readline";
import { stdin, stdout } from "process";
import fetch from "../include/fetch.js";

// TODO - Now its your turn to make the working example! :)

const rl = readline.createInterface({ input: stdin, output: stdout });

function removeHTMLTags(str: string) {
  return str.replace(/<[^>]*>?/gm, "");
}

function question() {
  rl.question("\nEnter an anime to query: ", (input: string) => {
    const query = `
      query ($search: String) {
        Media (search: $search, type: ANIME) {
          title {
            romaji
            english
            native
          }
          description
          averageScore
          genres
        }
      }
    `;

    const variables = {
      search: input,
    };

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Title: ${data.data.Media.title.english}`);
        console.log(`Description: ${removeHTMLTags(data.data.Media.description)}`);
        console.log(`Average Score: ${data.data.Media.averageScore}`);
        console.log(`Genres: ${data.data.Media.genres.join(", ")}`);
        question();
      })
      .catch(err => {
        console.error(`Could not find information for ${input}`);
        question();
      });
  });
}

question();
