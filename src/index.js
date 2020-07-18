const scraper = require("./Scraper");
const cheerio = require("cheerio");

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

    console.log(squad);
  })
  .catch(console.error);

// Bristol
scraper
  .scrapePage("https://www.bristolbearsrugby.com/teams/first-team-squad/")
  .then((response) => {
    const $ = cheerio.load(response.data);
    const squadPlayerElements = $(".m-player-card");

    const squad = [];
    squadPlayerElements.each(function () {
      squad.push(
        scraper.formPlayerObject({
          team: "Bristol",
          name: $(this).find(".m-player-card__title").text(),
          position: $(this).find(".m-player-card__stats dd[itemprop=jobTitle]").text(),
          playerLink: $(this).find("a.m-player-card__link").attr("href"),
          image: $(this).find("img.m-player-card__image").attr("src"),
          height: $(this).find(".m-player-card__stats dd[itemprop=height]").text(),
          weight: $(this).find(".m-player-card__stats dd[itemprop=weight]").text(),
          dob: $(this).find(".m-player-card__stats > dd").first().text()
        })
      );
    });

    console.log(squad);
  })
  .catch(console.error);
