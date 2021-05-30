/**
 * @fileoverview NextJS authentication page
 */

//Imports
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import getConfig from 'next/config';

//Get the providers config
const {serverRuntimeConfig} = getConfig();

//Export
export default NextAuth({
  secret: serverRuntimeConfig.next.secret,
  providers: [
    //Auth0 provider
    Providers.Auth0(serverRuntimeConfig.auth0)
  ]
});