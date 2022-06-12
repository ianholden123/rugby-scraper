const cheerio = require("cheerio")
const scraper = require("../Scraper")
const {
  createAbsoluteUrl,
  extractHeightFromString,
  extractWeightFromString,
} = require("../utils/utils")

const teamName = 'Bristol Bears'
const url = "https://www.bristolbearsrugby.com/"
const urlPlayersPage = "teams/first-team-squad/"

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $('.m-player-card')

    const squad = []
    squadPlayerElements.each((_, element) => {
      const height = $(element).find(".m-player-card__stats dd[itemprop=height]").text();
      const weight = $(element).find(".m-player-card__stats dd[itemprop=weight]").text();

      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find(".m-player-card__title").text(),
          position: $(element).find(".m-player-card__stats dd[itemprop=jobTitle]").text(),
          playerLink: createAbsoluteUrl(url, $(element).find("a.m-player-card__link").attr("href")),
          image: createAbsoluteUrl(url, $(element).find("img.m-player-card__image").attr("src")),
          height: extractHeightFromString(height),
          weight: extractWeightFromString(weight),
          dob: $(element).find(".m-player-card__stats > dd").first().text()
        })
      )
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
