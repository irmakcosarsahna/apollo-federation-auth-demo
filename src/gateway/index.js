const { ApolloServer } = require('apollo-server-cloud-functions');
const {ApolloGateway, IntrospectAndCompose} = require("@apollo/gateway");
const {
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {name: "users", url: "https://users-rir2cigc2a-uc.a.run.app"}
        ],
    }),
    __exposeQueryPlanExperimental: false,
});

const server = new ApolloServer({
    gateway,
    engine: false,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({req, res}) => ({
        headers: req.headers,
        req,
        res,
    }),
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({embed: true}),
    ]
});


exports.handler = server.createHandler();

