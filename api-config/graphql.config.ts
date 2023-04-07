import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

const getToken = (ctx: any | string) => {
  if (typeof ctx === 'string') return ctx;
  return Cookies.get('token') || (ctx && ctx?.req?.cookies?.token) || '';
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // If there are GraphQL errors, iterate through each of them
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      // Log the error message, location, and path for each GraphQL error
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  // If there's a network error, log the error message
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
// Function to create an Apollo Client instance and connect to the GraphQL backend
const gqlClientConnect = (ctx: any) => {
  // Create a new InMemoryCache instance
  const cache = new InMemoryCache({
    // wether we add type name, feel free to enable it if you want typename
    addTypename: false,
    typePolicies: {},
  });

  // Create an HttpLink instance to connect to the GraphQL server
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_ENDPOINT,
    useGETForQueries: false, // Use GET method for queries
  });

  // auth link for passing tokens
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${getToken(ctx)}`,
      },
    };
  });

  // Create the ApolloClient instance
  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    ssrMode: typeof window === 'undefined', // Set SSR mode based on whether the window object is available
    cache, // Assign the previously created InMemoryCache instance
    link:
      process.env.NODE_ENV === 'development'
        ? from([errorLink, authLink, httpLink])
        : authLink.concat(httpLink), // Assign the HttpLink instance as the link for the ApolloClient & authLink
  });

  return apolloClient; // Return the ApolloClient instance
};

export default gqlClientConnect;
