const cheerio = require("cheerio")
const scraper = require("../Scraper")
const { createAbsoluteUrl } = require("../utils/utils")

const teamName = 'Northampton Saints'
const url = "https://www.northamptonsaints.co.uk/"
const urlPlayersPage = "rugby/squad/senior"

module.exports = {
  handleScrapedResponse: (scrapedResponse) => {
    const $ = cheerio.load(scrapedResponse)
    const squadPlayerElements = $(".widget--squad .grid__item")

    const squad = []
    squadPlayerElements.each((_, element) => {
      squad.push(
        scraper.formPlayerObject({
          team: teamName,
          name: $(element).find(".summary__title").text(),
          position: $(element).find(".summary__tag").text(),
          playerLink: createAbsoluteUrl(url, $(element).find("a").attr("href")),
          image: $(element).find("a").attr("style").replace('background-image:url(', '').slice(0, -1)
        })
      )
    })
    return squad
  },
  teamName,
  url,
  urlPlayersPage,
}
