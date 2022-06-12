const cheerio = require("cheerio");
const scraper = require("../Scraper");
const { createAbsoluteUrl } = require("../utils/utils");

const teamName = 'Wasps'
const url = 'https://www.wasps.co.uk/'
const urlPlayersPage = 'players-staff/senior-squad/'

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $('.player_blocks')

    const squad = [];
    squadPlayerElements.each((_, element) => {
      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find('.staff_title').text(),
          position: $(element).find('.staff_position').text(),
          playerLink: createAbsoluteUrl(url, $(element).find("a").attr("href")),
          image: createAbsoluteUrl(url, $(element).find(".staff_img img").attr("src")),
        })
      );
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
