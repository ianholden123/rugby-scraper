const cheerio = require("cheerio");
const scraper = require("./Scraper");
const file = require("./File");
const { extractHeightFromString, extractWeightFromString } = require("./utils/utils");

// Bath
scraper
  .scrapePage("https://www.bathrugby.com/the-club/the-team/bath-rugby-senior-squad/")
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
          playerLink: $(this).find("a").attr("href"),
          image: $(this).find(".visual .headShot img").attr("src") // Needs some adjustment
        })
      );
    });

    file.writeToFile('output/teams/bath.json', squad);
  })
  .catch(console.error);

// Bristol Bears
scraper
  .scrapePage("https://www.bristolbearsrugby.com/teams/first-team-squad/")
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
          playerLink: $(this).find("a.m-player-card__link").attr("href"),
          image: $(this).find("img.m-player-card__image").attr("src"),
          height: extractHeightFromString(height),
          weight: extractWeightFromString(weight),
          dob: $(this).find(".m-player-card__stats > dd").first().text()
        })
      );
    });

    file.writeToFile('output/teams/bristol-bears.json', squad);
  })
  .catch(console.error);

// Exeter Chiefs
scraper
  .scrapePage("https://www.exeterchiefs.co.uk/club/players")
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
          playerLink: $(this).find("a").attr("href"),
          image: $(this).find("a img").attr("src")
        })
      );
    });

    file.writeToFile('output/teams/exeter-chiefs.json', squad);
  })
  .catch(console.error);

// Leicester Tigers
scraper
  .scrapePage("https://www.leicestertigers.com/team/senior")
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
          playerLink: $(this).find("a.summary--player").attr("href"),
          image: $(this).find("a.summary--player").attr("style")
        })
      );
    });

    file.writeToFile('output/teams/leicester-tigers.json', squad);
  })
  .catch(console.error);

// London Irish
scraper
  .scrapePage("https://www.london-irish.com/team/first-team/47/")
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
          playerLink: $(this).find("a").attr("href"),
          image: $(this).find(".player-image img").attr("src")
        })
      );
    });

    file.writeToFile('output/teams/london-irish.json', squad);
  })
  .catch(console.error);

// Sale Sharks
scraper
  .scrapePage("https://www.salesharks.com/teams/first-team/")
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
          playerLink: $(this).find("a.squadBlock-link").attr("href"),
          image: $(this).find(".squadBlockImg img").attr("src")
        })
      );
    });

    file.writeToFile('output/teams/sale-sharks.json', squad);
  })
  .catch(console.error);

// Wasps
scraper
  .scrapePage("https://www.wasps.co.uk/players-staff/senior-squad/")
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
          playerLink: $(this).find("a").attr("href"),
          image: $(this).find(".staff_img img").attr("src")
        })
      );
    });

    file.writeToFile('output/teams/wasps.json', squad);
  })
  .catch(console.error);
