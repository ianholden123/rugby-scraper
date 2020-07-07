const scraper = require('./Scraper');

// Wasps
scraper.scrapePage('https://www.wasps.co.uk/players-staff/senior-squad/')
  .then((response => {
    squad = scraper.getPlayersFromHtml(
      response.data,
      'Wasps',
      '.player_blocks',
      '.staff_title',
      '.staff_position',
      'a',
      '.staff_img img'
    );
    console.log(squad);
  }))
  .catch(console.error);

// Bristol
scraper.scrapePage('https://www.bristolbearsrugby.com/teams/first-team-squad/')
  .then((response => {
    squad = scraper.getPlayersFromHtml(
      response.data,
      'Bristol',
      '.m-player-card',
      '.m-player-card__title',
      '.m-player-card__stats dd[itemprop=jobTitle]',
      'a.m-player-card__link',
      'img.m-player-card__image',
      '.m-player-card__stats dd[itemprop=height]',
      '.m-player-card__stats dd[itemprop=weight]',
      // '.m-player-card__stats',
    );
    console.log(squad);
  }))
  .catch(console.error);