//Imports
import getConfig from 'next/config';
import {ApolloClient, InMemoryCache} from '@apollo/client';

//Get the config
const {publicRuntimeConfig} = getConfig();

//Instantiate Apollo clients
const codedayClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graph.codeday.org'
});

const graphCtfClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: publicRuntimeConfig.graphCtf.url
});

//Export
export {codedayClient, graphCtfClient};