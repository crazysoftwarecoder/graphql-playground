import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from "./_db.js";
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        games: () => db.games,  
        authors: () => db.authors,
        reviews: () => db.reviews,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
