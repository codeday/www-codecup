/**
 * @fileoverview NextJS Config
 */

//Imports
const chalk = require('chalk');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules');
const {randomBytes} = require('crypto');

//Ensure NextJS secret is provided and long enough
const entropy = 512;
if (process.env.NEXTAUTH_SECRET == null || process.env.NEXTAUTH_SECRET.length < entropy)
{
  //Log
  console.warn(chalk.red(`[WARNING] Environment variable "NEXTAUTH_SECRET" is missing or too short! (Needs to be at least ${entropy} characters long!)`));
  console.warn(chalk.red('[WARNING] Generating random secret "NEXTAUTH_SECRET" (Load-balanced sessions won\'t work!)'));

  //Generate crypto-safe secret
  const bytes = randomBytes(entropy);

  //Convert to string
  const secret = bytes.toString('base64');

  //Update environment variable
  process.env.NEXTAUTH_SECRET = secret;
}

//Export
module.exports = withPlugins([
  withImages(),
  withTranspileModules([
    'react-syntax-highlighter'
  ]),
  {
    serverRuntimeConfig: {
      auth0: {
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        domain: process.env.AUTH0_DOMAIN,
        authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`
      },
      next: {
        secret: process.env.NEXTAUTH_SECRET
      }
    }
  }
]);