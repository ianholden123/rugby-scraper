const cheerio = require("cheerio")
const scraper = require("../Scraper")
const { createAbsoluteUrl } = require("../utils/utils")

const teamName = 'Gloucester'
const url = "https://www.gloucesterrugby.co.uk/"
const urlPlayersPage = "fixtures-teams/players/"

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $('.squadBlock')

    const squad = []
    squadPlayerElements.each((_, element) => {
      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find("a.squadBlock-link").attr("title"),
          position: $(element).find(".squadBlockPosition p").text(),
          playerLink: createAbsoluteUrl(url, $(element).find("a.squadBlock-link").attr("href")),
          image: $(element).find("div.squadBlockImg-Headshot img").attr("src")
        })
      )
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
