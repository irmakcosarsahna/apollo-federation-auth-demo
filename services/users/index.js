const {ApolloServer, gql} = require("apollo-server");
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
        }
    ])
});

server.listen({port: 4001}).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});

const users = [
    {
        id: "1",
        name: "Ada Lovelace",
        birthDate: "1815-12-10",
        username: "@ada"
    },
    {
        id: "2",
        name: "Alan Turing",
        birthDate: "1912-06-23",
        username: "@complete"
    }
];
