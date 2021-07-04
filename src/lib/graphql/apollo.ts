//Imports
import getConfig from 'next/config';
import {ApolloClient, from, HttpLink, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {setContext} from '@apollo/client/link/context';

//Get the config
const {publicRuntimeConfig} = getConfig();

//Global error handling link
const errorLink = onError(res =>
{
  let error = false;

  //Network errors
  if (res.networkError != null)
  {
    console.error(res.networkError);

    error = true;
  }

  //GraphQL syntax errors
  if (res.graphQLErrors != null)
  {
    for (const err of res.graphQLErrors)
    {
      console.error(err);
    }

    error = true;
  }

  if (error)
  {
    throw new Error('GraphQL operation failed! (See above for more details)');
  }
});

//CodeDay client
const codedayClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorLink,
    new HttpLink({
      uri: 'https://graph.codeday.org'
    })
  ])
});

//GraphCTF client
const graphCtfClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorLink,
    setContext((_, ctx) =>
    {
      //Get the GraphCTF token
      const token = localStorage.getItem('graphctf-token');

      //Inject the authorization header
      return {
        headers: {
          ...ctx.headers,
          authorization: token != null ? `Bearer ${token}` : ''
        }
      };
    }),
    new HttpLink({
      uri: () =>
      {
        //Compute fully-qualified GraphQL path
        const url = new URL(publicRuntimeConfig.graphCtf.url);
        url.pathname = '/graphql';

        return url.toString();
      }
    })
  ])
});

//Export
export {codedayClient, graphCtfClient};