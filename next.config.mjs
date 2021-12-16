/**
 * @fileoverview NextJS Config
 */

//Imports
import chalk from 'chalk';
import withImages from 'next-images';
import withPlugins from 'next-compose-plugins';
import withTranspileModules from 'next-transpile-modules';
import {randomBytes} from 'crypto';

//Get Next auth secret
const entropy = 64;
let nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (nextAuthSecret == null || Buffer.byteLength(nextAuthSecret, 'utf-8') < entropy)
{
  //Log
  console.warn(chalk.red(`[WARNING] Environment variable "NEXTAUTH_SECRET" is missing or too short! (Needs to be at least ${entropy} bytes!)`));
  console.warn(chalk.red('[WARNING] Generating random secret "NEXTAUTH_SECRET" (Load-balanced sessions won\'t work!)'));

  //Generate crypto-safe secret
  const bytes = randomBytes(entropy);

  //Convert to string
  const secret = bytes.toString('base64');

  //Update environment variable
  nextAuthSecret = secret;
}

//Export
export default withPlugins([
  withImages(),
  withTranspileModules([
    'react-syntax-highlighter'
  ]),
  {
    serverRuntimeConfig: {
      /**
       * Auth0 client configuration
       */
      auth0: {
        authorization: `https://${process.env.AUTH0_ISSUER}/authorize?response_type=code&prompt=login`,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER
      },
      /**
       * NextAuth configuration
       */
      nextAuth: {
        secret: nextAuthSecret
      },
      /**
       * GraphCTF configuration
       */
      graphCtf: {
        audience: process.env.GRAPHCTF_AUDIENCE,
        secret: process.env.GRAPHCTF_SECRET,
        url: process.env.GRAPHCTF_URL
      }
    },
    publicRuntimeConfig: {
      /**
       * GraphCTF configuration
       */
      graphCtf: {
        url: process.env.GRAPHCTF_URL
      }
    }
  }
]);