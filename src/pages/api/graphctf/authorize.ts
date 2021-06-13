/**
 * @fileoverview Authorize to GraphCTF
 * 
 * This endpoint should only be called once the user signs in (With NextAuth) and is ready to join a game
 */

//Imports
import Joi from 'joi';
import type {NextApiRequest, NextApiResponse} from 'next';
import validate from '@/lib/middleware/validation';
import {UserRole} from '@/lib/graphctf/types';
import {getSession} from 'next-auth/client';
import {mintToken} from '@/lib/graphctf/token';

//The endpoint request schema
const schema = Joi.object({
  game: Joi.string().regex(/^c[a-z0-9]{24}$/),
  team: Joi.string().regex(/^[A-z0-9-]+$/),
  role: Joi.string().valid(...Object.values(UserRole)),
});

export default validate({
  body: schema
}, async (req: NextApiRequest, res: NextApiResponse) =>
{
  //Get the session
  const session = await getSession({req});

  //Deny access if the session is null
  if (session == null)
  {
    return res.status(401).json({
      error: {
        name: 'Unauthorized',
        description: 'Please sign in to CodeCup first!'
      }
    });
  }

  //Get the profile
  const profile = session.profile as Record<string, any>;

  //Get if admin
  const isAdmin = profile['https://codeday.xyz/staff'] == true || profile['https://codeday.xyz/employee'] == true;

  //Mint a GraphCTF token
  const graphCtfToken = mintToken(
    isAdmin,
    req.body.game,
    req.body.team,
    session.user!.name!,
    req.body.role
  );

  //Save the token
  session.graphCtfToken = graphCtfToken;
});