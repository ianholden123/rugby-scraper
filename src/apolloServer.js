const { ApolloServer, gql } = require('apollo-server')
const players = require('../output/teams/wasps.json')

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