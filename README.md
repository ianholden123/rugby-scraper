# Rugby Scraper

Rugby Scraper is a Node program designed to scrape player data from rugby websites. This data is then output into multiple JSON files.

> :warning: As is the nature of scraping from multiple different webpages, certain team's player data may not be collected if the corresponding team changes their webpage markup.

Currently, this project outputs data from the following rugby teams:

- Bath
- Bristol Bears
- Exeter Chiefs
- Gloucester
- Leicester Tigers
- London Irish
- Northampton Saints
- Sale Sharks
- Wasps
- Worcester Warriors

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Rugby Scraper.

```bash
npm install
```

## Usage

This is currently set up to crawl a variety of teams that are outlined in the `index.js` file. JSON files will be output to a `output/teams/` directory. To start crawling for teams, run the following:

```bash
npm start
```

## Testing

To run unit tests (with coverage), run the following:

```bash
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)