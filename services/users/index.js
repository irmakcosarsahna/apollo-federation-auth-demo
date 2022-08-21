const { ApolloServer, gql } = require('apollo-server-cloud-functions');
const {
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const {buildSubgraphSchema} = require("@apollo/subgraph");
const connectDB = require('./db');
const {UserModel} = require('./models');

connectDB()

const typeDefs = gql`
    type Mutation {
        addUser(name: String!): User
    }
    type User {
        id: ID
        name: String
    },
    type Query {
        getUserById(id: String = ""): User,
        getUsers: [User]
    }
`;

const resolvers = {
    resolve: (parent, args, context, info) => {
        return parent.id || parent._id
    },
    Query: {
        getUsers: async () => await UserModel.find({}),
        getUserById: async (_, {id}) => await UserModel.findById(id)
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await UserModel.create(args);
                return response;
            } catch (e) {
                return e.message;
            }
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([
        {
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: 'bounded',
            context: ({ req, res }) => ({
                headers: req.headers,
                req,
                res,
            }),
            plugins: [
                ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ],
        }
    ])
});

exports.handler = server.createHandler();
