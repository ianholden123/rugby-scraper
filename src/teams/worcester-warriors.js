const cheerio = require('cheerio');
const scraper = require('../Scraper');

const teamName = 'Worcester Warriors';
const url = 'https://warriors.co.uk/';
const urlPlayersPage = 'teams/current/first-team/';

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse);
    const squadPlayerElements = $('.teams-area article');

    const squad = [];
    squadPlayerElements.each((_, element) => {
      squad.push(
          scraper.formPlayerObject({
            team: teamName,
            name: $(element).find('.caption h2').text(),
            playerLink: $(element).find('a').attr('href'),
            image: $(element).find('img').attr('src'),
          }),
      );
    });
    return squad;
  },
  teamName,
  url,
  urlPlayersPage,
};
