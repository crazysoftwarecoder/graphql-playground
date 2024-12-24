import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from "./_db.js";
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        games: () => db.games,  
        authors: () => db.authors,
        reviews: () => db.reviews,
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        }
    },
    Game: {
        reviews: (game) => db.reviews.filter(review => review.game_id === game.id)
    },
    Author: {
        reviews: (author) => db.reviews.filter(review => review.author_id === author.id)
    },
    Review: {
        author: (review) => db.authors.find(author => author.id === review.author_id),
        game: (review) => db.games.find(game => game.id === review.game_id)
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
