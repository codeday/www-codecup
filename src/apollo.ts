//Imports
import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

//Create an HTTP link
const httpLink = new HttpLink({
  uri: 'https://graph.codeday.org'
});

//Create an error link
const errorLink = onError(res =>
{
  //TODO: Add a UI modal to alert the user
  console.error(res.graphQLErrors, res.networkError);
});


//Instantiate an Apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorLink,
    httpLink
  ])
});

//Export
export default client;