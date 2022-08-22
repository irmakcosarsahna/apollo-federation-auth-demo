const { ApolloServer } = require('apollo-server-cloud-functions');
const {ApolloGateway, IntrospectAndCompose} = require("@apollo/gateway");

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {name: "users", url: "http://localhost:9595/graphql"}
        ],
    }),
    __exposeQueryPlanExperimental: false,
});

const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
});


exports.handler = server.createHandler();

