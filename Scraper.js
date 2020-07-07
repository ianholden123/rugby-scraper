const axios = require("axios");
const cheerio = require("cheerio");

let scraper = (module.exports = {});

/**
 * Scrape a webpage and return the Axios response as a promise
 * @param {string} url The URL of the webpage to scrape
 */
scraper.scrapePage = async (url) => {
  return await axios(url);
};

/**
 * Return an array of all players found on a given HTML page
 * @param {string} html The DOM for a webpage as a string
 * @param {string} team The team that we are scraping
 * @param {string} playerLinkElement The DOM element that holds the link to the player info page (targets 'href' attribute)
 * @param {string} nameElement The DOM element that represents the name of the player on a webpage
 * @param {string} squadPlayerElements The DOM element that represents all squad players on a webpage
 * @param {string} positionElement The DOM element that represents the position of the player on a webpage
 * @param {string} imageElement The DOM element that contains an image of the player on a webpage (targets 'src' attribute)
 * @param {string} heightElement The DOM element that contains the height of the player on a webpage
 * @param {string} weightElement The DOM element that contains the weight of the player on a webpage
 * @param {string} dobElement The DOM element that contains the date of birth of the player on a webpage
 */
scraper.getPlayersFromHtml = (
  html,
  team,
  squadPlayersElement,
  nameElement,
  positionElement,
  playerLinkElement = null,
  imageElement = null,
  heightElement = null,
  weightElement = null,
  // dobElement = null
) => {
  const $ = cheerio.load(html);
  const suqadPlayerElements = $(squadPlayersElement);
  const squadPlayers = [];

  suqadPlayerElements.each(function () {
    const playerLink = $(this).find(playerLinkElement).attr("href");
    const name = $(this).find(nameElement).text();
    const position = $(this).find(positionElement).text();
    const image = $(this).find(imageElement).attr("src");
    const height = $(this).find(heightElement).text();
    const weight = $(this).find(weightElement).text();
    // const dob = $(this).find(dobElement).text();

    squadPlayers.push({
      team,
      playerLink,
      name,
      position,
      image,
      height,
      weight,
      // dob,
    });
  });

  return squadPlayers;
};
