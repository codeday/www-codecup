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
  callbacks: {
    jwt: (token, _user, _account, profile) =>
    {
      //If the profile is provided, save the profile to the token
      if (profile != null)
      {
        token.profile = profile;
      }

      return token;
    },
    session: (session, token) =>
    {
      //Restore the profile from the token
      session.profile = token.profile;

      return session;
    }
  },
  secret: serverRuntimeConfig.nextAuth.secret,
  providers: [
    //Auth0 provider
    Providers.Auth0(serverRuntimeConfig.auth0)
  ]
});