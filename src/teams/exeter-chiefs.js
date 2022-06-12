const cheerio = require('cheerio');
const scraper = require('../Scraper');
const {createAbsoluteUrl} = require('../utils/utils');

const teamName = 'Exeter Chiefs';
const url = 'https://www.exeterchiefs.co.uk/';
const urlPlayersPage = 'club/players';

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse);
    const squadPlayerElements = $('.player-list .player');

    const squad = [];
    squadPlayerElements.each((_, element) => {
      squad.push(
          scraper.formPlayerObject({
            team: teamName,
            name: $(element).find('h3').text(),
            position: $(element).find('.position').text(),
            playerLink: createAbsoluteUrl(url, $(element).find('a').attr('href')),
            image: $(element).find('a img').attr('src'),
          }),
      );
    });
    return squad;
  },
  teamName,
  url,
  urlPlayersPage,
};
