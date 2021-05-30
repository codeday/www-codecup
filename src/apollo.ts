//Imports
import {ApolloClient, InMemoryCache} from '@apollo/client';

//Instantiate an Apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graph.codeday.org'
});

//Export
export default client;