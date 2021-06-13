/**
 * @fileoverview GraphCTF token helper
 */

//Imports
import getConfig from 'next/config';
import {UserRole} from './types';
import {sign} from 'jsonwebtoken';

//Get the providers config
const {serverRuntimeConfig} = getConfig();

/**
 * Mint a token for GraphCTF
 * @param admin Whether or not the user is a global admin
 * @param game The game ID (Not required if `admin` is `true`)
 * @param team The team's slug
 * @param username The user's username
 * @param role The user's role in a team
 * @link https://github.com/graphctf/graphctf/blob/main/src/context/auth/JwtToken.ts#L3
 */
 export const mintToken = (admin = false, game?: string, team?: string, username?: string, role = UserRole.USER): string =>
 {
   //Sign the token
   const token = sign({
     adm: admin,
     gam: game,
     tea: team,
     sub: username,
     rol: role
   }, serverRuntimeConfig.graphCtf.secret, {
     algorithm: 'HS512',
     audience: serverRuntimeConfig.graphCtf.audience
   });
 
   return token;
 };