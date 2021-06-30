/**
 * @fileoverview GraphCTF authenticate helper
 */

//Imports
import getConfig from 'next/config';
import {ExchangeDocument} from '@/lib/graphql/graphctf';
import {graphCtfClient} from '@/lib/graphql/apollo';
import {sign} from 'jsonwebtoken';

//Get the config
const {serverRuntimeConfig} = getConfig();

/**
 * Authenticate to GraphCTF
 * @param code The team join code
 * @param username The user's username
 * @returns The GraphCTF session token
 */
const authenticate = async (code: string, username: string): Promise<string> =>
{
  //Create and sign the exchange token
  const exchangeToken = sign({
    code,
    username
  }, serverRuntimeConfig.graphCtf.secret, {
    algorithm: 'HS512',
    audience: serverRuntimeConfig.graphCtf.audience
  });

  //Exchange the token with GraphCTF for a session token
  const {data} = await graphCtfClient.mutate({
    mutation: ExchangeDocument,
    variables: {
      token: exchangeToken
    }
  });

  //Extract data
  const sessionToken = data!.exchange;

  return sessionToken;
};

//Export
export default authenticate;