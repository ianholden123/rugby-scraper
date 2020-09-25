const fs = require("fs");
const { ApolloServer, gql } = require('apollo-server')

// Read all players data from the player JSON files
let players = []
fs.readdir(__dirname + "/../output/teams/", (err, fileNames) => {
  if (err) console.error('ERROR', err)
  fileNames.forEach(filename => {
    fs.readFile(`${__dirname}/../output/teams/${filename}`, "utf-8", (err, content) => {
      if (err) console.error('ERROR', err)
      players = players.concat(JSON.parse(content))
    });
  })
});

let typeDefs = gql`
  type Player {
    name: String
    team: String
    position: String
    isForwardOrBack: String
    playerLink: String
    image: String
    height: String
    weight: String
    dob: String
  }
  type Query {
    players: [Player]
  }
`;

let resolvers = {
  Query: {
    players: () => players
  }
}

let server = new ApolloServer({ typeDefs, resolvers })
server.listen()