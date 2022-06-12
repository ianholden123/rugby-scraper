const cheerio = require("cheerio");
const scraper = require("../Scraper");
const file = require("../File");
const { createAbsoluteUrl } = require("../utils/utils");

module.exports = class TeamScraper {
  constructor ({teamName, url, urlPlayersPage, handleScrapedResponse = () => {} }) {
    this.teamName = teamName
    this.url = url
    this.urlPlayersPage = urlPlayersPage
    this.handleScrapedResponse = handleScrapedResponse
  }

  scrapeTeamPage() {
    return scraper.scrapePage(createAbsoluteUrl(this.url, this.urlPlayersPage))
      .then(response => {
        const teamJson = this.handleScrapedResponse(response)
        this.#saveTeamJsonToFile(teamJson)
      })
      .catch(console.error);
  }

  #saveTeamJsonToFile(teamJson) {
    file.writeToFile(`output/teams/${this.teamName}.json`, teamJson)
  }
}
