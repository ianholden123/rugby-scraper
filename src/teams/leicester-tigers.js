const cheerio = require("cheerio")
const scraper = require("../Scraper")
const { createAbsoluteUrl } = require("../utils/utils")

const teamName = 'Leicester Tigers'
const url = "https://www.leicestertigers.com/"
const urlPlayersPage = "team/senior"

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $('.player-list .player')

    const squad = []
    squadPlayerElements.each((_, element) => {
      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find(".summary__title").text(),
          position: $(element).find(".summary__tag").text(),
          playerLink: createAbsoluteUrl(url, $(element).find("a.summary--player").attr("href")),
          image: $(element).find("a.summary--player").attr("style").replace('background-image:url(', '').slice(0, -1)
        })
      )
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
