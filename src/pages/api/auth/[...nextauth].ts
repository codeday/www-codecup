/**
 * @fileoverview NextJS authentication page
 */

//Imports
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import getConfig from 'next/config';

//Get the config
const {serverRuntimeConfig} = getConfig();

//Export
export default NextAuth({
  secret: serverRuntimeConfig.nextAuth.secret,
  providers: [
    //Auth0 provider
    Providers.Auth0(serverRuntimeConfig.auth0)
  ]
});