const cheerio = require('cheerio');
const scraper = require('../Scraper');
const {createAbsoluteUrl} = require('../utils/utils');

const teamName = 'London Irish';
const url = 'https://www.london-irish.com/';
const urlPlayersPage = 'team/first-team/47/';

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse);
    const squadPlayerElements = $('.player-list .player');

    const squad = [];
    squadPlayerElements.each((_, element) => {
      squad.push(
          scraper.formPlayerObject({
            team: teamName,
            name: $(element).find('.name').text(),
            position: $(element).find('.name span').text(),
            playerLink: createAbsoluteUrl(url, $(element).find('a').attr('href')),
            // @TODO: Image needs some adjustment
            image: createAbsoluteUrl(url, $(element).find('.player-image img').attr('src')),
          }),
      );
    });
    return squad;
  },
  teamName,
  url,
  urlPlayersPage,
};
