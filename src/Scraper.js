const puppeteer = require('puppeteer');
const {
  isForward,
  isBack
} = require("./utils/playerPositions")

let scraper = (module.exports = {});

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

/**
 * Scrape a webpage and return the Axios response as a promise
 * @param {string} url The URL of the webpage to scrape
 */
scraper.scrapePage = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(50000)
  await page.goto(url, { waitUntil: 'networkidle0' });
  await wait(1000)
  const content = await page.content()
  browser.close();
  return content
};

/**
 * Return a standardised object of a player
 * @param {string} team The team that the player belongs to
 * @param {string} name The name of the player
 * @param {string} position The position that the player plays in
 * @param {string} playerLink The link to the player info page
 * @param {string} image The link to the image of the player
 * @param {object} height The height of the player
 * @param {object} weight The weight of the player
 * @param {string} dob The date of birth of the player
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
  if (
    !Array.isArray(height) ||
    !height.length ||
    !height.every(n => typeof n === 'object' && n.hasOwnProperty('value') && n.hasOwnProperty('unit'))
  ) height = null
  if (
    !Array.isArray(weight) ||
    !weight.length ||
    !weight.every(n => typeof n === 'object' && n.hasOwnProperty('value') && n.hasOwnProperty('unit'))
  ) weight = null
  if (typeof dob !== 'string') dob = null

  let isForwardOrBack = null
  if (position) isForward(position) ? isForwardOrBack = 'Forward' : isBack(position) ? isForwardOrBack = 'Back' : null

  return {
    team,
    name,
    position,
    isForwardOrBack,
    playerLink,
    image,
    height,
    weight,
    dob,
  };
};
