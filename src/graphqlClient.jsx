import { GraphQLClient } from 'graphql-request';

const url = process.env.EXPO_PUBLIC_GRAPHQL_API_URL;
const apikey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;

const client = new GraphQLClient(url, {
    headers: {
        Authorization:
         `apikey ${apikey}`
    }
});

export default client;