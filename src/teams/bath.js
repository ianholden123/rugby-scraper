const cheerio = require("cheerio")
const scraper = require("../Scraper")
const { createAbsoluteUrl } = require("../utils/utils")

const teamName = 'Bath'
const url = "https://www.bathrugby.com/"
const urlPlayersPage = "the-club/the-team/bath-rugby-senior-squad/"

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $('.people .column')

    const squad = []
    squadPlayerElements.each((_, element) => {
      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find(".visual .headShot img").attr('alt'), // Needs some adjustment
          position: $(element).find(".headline strong em").text(),
          playerLink: createAbsoluteUrl(url + urlPlayersPage, $(element).find("a").attr("href")),
          image: createAbsoluteUrl(url, $(element).find(".visual .headShot img").attr("src")) // Needs some adjustment
        })
      )
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
