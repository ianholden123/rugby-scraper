const cheerio = require("cheerio")
const scraper = require("../Scraper")
const { createAbsoluteUrl } = require("../utils/utils")

const teamName = 'Sale Sharks'
const url = "https://www.salesharks.com/"
const urlPlayersPage = "teams/first-team/"

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $(".squadBody .playerSquad")

    const squad = []
    squadPlayerElements.each((_, element) => {
      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find(".staffNameFirst").text().trim() + ' ' + $(element).find(".staffNameLast").text().trim(),
          position: $(element).find(".playerSquad").attr('data-position'),
          playerLink: createAbsoluteUrl(url, $(element).find("a.squadBlock-link").attr("href")),
          image: $(element).find(".squadBlockImg img").attr("src")
        })
      )
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
