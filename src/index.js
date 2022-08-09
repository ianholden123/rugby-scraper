const scraper = require('./Scraper');
const file = require('./File');
const {createAbsoluteUrl} = require('./utils/utils');

class TeamScraper {
  constructor({
    teamName,
    url,
    urlPlayersPage,
    handleScrapedResponse = () => {},
  }) {
    this.teamName = teamName;
    this.url = url;
    this.urlPlayersPage = urlPlayersPage;
    this.handleScrapedResponse = handleScrapedResponse;
  }

  scrapeTeamPage() {
    console.log('Starting to scrape', this.teamName, 'at', this.url);
    return scraper.scrapePage(createAbsoluteUrl(this.url, this.urlPlayersPage))
        .then((response) => {
          console.log('Finished scraping', this.teamName);
          const teamJson = this.handleScrapedResponse(response);
          this.#saveTeamJsonToFile(teamJson);
        })
        .catch(console.error);
  }

  #saveTeamJsonToFile(teamJson) {
    try {
      file.writeToFile(`output/teams/${this.teamName}.json`, teamJson);
    } catch (e) {
      console.error(e);
    };
  }
}

const pathToTeams = require('path').join(__dirname, 'teams');
require('fs').readdirSync(pathToTeams).forEach((teamFile) => {
  const teamConfig = require('./teams/' + teamFile);
  new TeamScraper(teamConfig).scrapeTeamPage();
});
