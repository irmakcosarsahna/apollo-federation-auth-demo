const { ApolloServer } = require('apollo-server-cloud-functions');
const {ApolloGateway, IntrospectAndCompose} = require("@apollo/gateway");

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {name: "users", url: "http://localhost:9595/graphql"},
        ],
    }),
    __exposeQueryPlanExperimental: false,
});

const server = new ApolloServer({
    gateway,

    // Apollo Graph Manager (previously known as Apollo Engine)
    // When enabled and an `ENGINE_API_KEY` is set in the environment,
    // provides metrics, schema management and trace reporting.
    engine: false,

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
});


exports.handler = server.createHandler();

