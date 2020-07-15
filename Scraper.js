const axios = require("axios");

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
 * @param {string} team The team that we are scraping
 * @param {string} name The DOM element that represents the name of the player on a webpage
 * @param {string} position The DOM element that represents the position of the player on a webpage
 * @param {string} playerLink The DOM element that holds the link to the player info page (targets 'href' attribute)
 * @param {string} image The DOM element that contains an image of the player on a webpage (targets 'src' attribute)
 * @param {string} height The DOM element that contains the height of the player on a webpage
 * @param {string} weight The DOM element that contains the weight of the player on a webpage
 * @param {string} dob The DOM element that contains the date of birth of the player on a webpage
 */
scraper.formPlayerObject = ({
  team = null,
  name = null,
  position = null,
  playerLink = null,
  image = null,
  height = null,
  weight = null,
  dob = null
} = {}) => {
  if (typeof team !== 'string') team = null
  if (typeof name !== 'string') name = null
  if (typeof position !== 'string') position = null
  if (typeof playerLink !== 'string') playerLink = null
  if (typeof image !== 'string') image = null
  if (typeof height !== 'string') height = null
  if (typeof weight !== 'string') weight = null
  if (typeof dob !== 'string') dob = null

  return {
    team,
    name,
    position,
    playerLink,
    image,
    height,
    weight,
    dob,
  };
};
