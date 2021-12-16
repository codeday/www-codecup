/**
 * @fileoverview NextJS authentication page
 */

//Imports
import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import getConfig from 'next/config';

//Get the config
const {serverRuntimeConfig} = getConfig();

//API handler
const handler = NextAuth({
  secret: serverRuntimeConfig.nextAuth.secret,
  providers: [
    //Auth0 provider
    Auth0Provider(serverRuntimeConfig.auth0)
  ]
});

//Export
export default handler;