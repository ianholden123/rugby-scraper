const cheerio = require("cheerio");
const scraper = require("./Scraper");
const file = require("./File");
const {
  extractHeightFromString,
  extractWeightFromString,
  createAbsoluteUrl
} = require("./utils/utils");

// ============================================================================================
// Bath =======================================================================================
// ============================================================================================
const urlBath = "https://www.bathrugby.com/"
const urlBathPlayersPage = "the-club/the-team/bath-rugby-senior-squad/"
scraper.scrapePage(createAbsoluteUrl(urlBath, urlBathPlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".people .column");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "Bath",
          name: $(this).find(".visual .headShot img").attr('alt'), // Needs some adjustment
          position: $(this).find(".headline strong em").text(),
          playerLink: createAbsoluteUrl(urlBath + urlBathPlayersPage, $(this).find("a").attr("href")),
          image: createAbsoluteUrl(urlBath, $(this).find(".visual .headShot img").attr("src")) // Needs some adjustment
        })
      );
    });

    file.writeToFile('output/teams/bath.json', squad);
  })
  .catch(console.error);


// ============================================================================================
// Bristol Bears ==============================================================================
// ============================================================================================
const urlBristol = "https://www.bristolbearsrugby.com/"
const urlBristolPlayersPage = "teams/first-team-squad/"
scraper.scrapePage(createAbsoluteUrl(urlBristol, urlBristolPlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".m-player-card");

    const squad = [];
    squadPlayerElements.each(function () {
      const height = $(this).find(".m-player-card__stats dd[itemprop=height]").text();
      const weight = $(this).find(".m-player-card__stats dd[itemprop=weight]").text();

      squad.push(
        scraper.formPlayerObject({
          team: "Bristol Bears",
          name: $(this).find(".m-player-card__title").text(),
          position: $(this).find(".m-player-card__stats dd[itemprop=jobTitle]").text(),
          playerLink: createAbsoluteUrl(urlBristol, $(this).find("a.m-player-card__link").attr("href")),
          image: createAbsoluteUrl(urlBristol, $(this).find("img.m-player-card__image").attr("src")),
          height: extractHeightFromString(height),
          weight: extractWeightFromString(weight),
          dob: $(this).find(".m-player-card__stats > dd").first().text()
        })
      );
    });

    file.writeToFile('output/teams/bristol-bears.json', squad);
  })
  .catch(console.error);


// ============================================================================================
// Exeter Chiefs ==============================================================================
// ============================================================================================
const urlExeter = "https://www.exeterchiefs.co.uk/"
const urlExeterPlayersPage = "club/players"
scraper.scrapePage(createAbsoluteUrl(urlExeter, urlExeterPlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".player-list .player");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "Exeter Chiefs",
          name: $(this).find("h3").text(),
          position: $(this).find(".position").text(),
          playerLink: createAbsoluteUrl(urlExeter, $(this).find("a").attr("href")),
          image: $(this).find("a img").attr("src")
        })
      );
    });

    file.writeToFile('output/teams/exeter-chiefs.json', squad);
  })
  .catch(console.error);


// ============================================================================================
// Leicester Tigers ===========================================================================
// ============================================================================================
const urlLeicester = "https://www.leicestertigers.com/"
const urlLeicesterPlayersPage = "team/senior"
scraper.scrapePage(createAbsoluteUrl(urlLeicester, urlLeicesterPlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".widget--squad .grid .grid__item");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "Leicester Tigers",
          name: $(this).find(".summary__title").text(),
          position: $(this).find(".summary__tag").text(),
          playerLink: createAbsoluteUrl(urlLeicester, $(this).find("a.summary--player").attr("href")),
          image: $(this).find("a.summary--player").attr("style").replace('background-image:url(', '').slice(0, -1)
        })
      );
    });

    file.writeToFile('output/teams/leicester-tigers.json', squad);
  })
  .catch(console.error);


// ============================================================================================
// London Irish ===============================================================================
// ============================================================================================
const urlLondonIrish = "https://www.london-irish.com/"
const urlLondonIrishPlayersPage = "team/first-team/47/"
scraper.scrapePage(createAbsoluteUrl(urlLondonIrish, urlLondonIrishPlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".player-list .player");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "London Irish",
          name: $(this).find(".name").text(),
          position: $(this).find(".name span").text(),
          playerLink: createAbsoluteUrl(urlLondonIrish, $(this).find("a").attr("href")),
          image: createAbsoluteUrl(urlLondonIrish, $(this).find(".player-image img").attr("src")) // Not quite right
        })
      );
    });

    file.writeToFile('output/teams/london-irish.json', squad);
  })
  .catch(console.error);


// ============================================================================================
// Sale Sharks ================================================================================
// ============================================================================================
const urlSale = "https://www.salesharks.com/"
const urlSalePlayersPage = "teams/first-team/"
scraper.scrapePage(createAbsoluteUrl(urlSale, urlSalePlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".squadBody .playerSquad");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "Sale Sharks",
          name: $(this).find(".staffNameFirst").text().trim() + ' ' + $(this).find(".staffNameLast").text().trim(),
          position: $(this).find(".playerSquad").attr('data-position'),
          playerLink: createAbsoluteUrl(urlSale, $(this).find("a.squadBlock-link").attr("href")),
          image: $(this).find(".squadBlockImg img").attr("src")
        })
      );
    });

    file.writeToFile('output/teams/sale-sharks.json', squad);
  })
  .catch(console.error);


// ============================================================================================
// Wasps ======================================================================================
// ============================================================================================
const urlWasps = "https://www.wasps.co.uk/"
const urlWaspsPlayersPage = "players-staff/senior-squad/"
scraper.scrapePage(createAbsoluteUrl(urlWasps, urlWaspsPlayersPage))
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".player_blocks");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "Wasps",
          name: $(this).find(".staff_title").text(),
          position: $(this).find(".staff_position").text(),
          playerLink: createAbsoluteUrl(urlWasps, $(this).find("a").attr("href")),
          image: createAbsoluteUrl(urlWasps, $(this).find(".staff_img img").attr("src"))
        })
      );
    });

    file.writeToFile('output/teams/wasps.json', squad);
  })
  .catch(console.error);
