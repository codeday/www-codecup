/**
 * @fileoverview Authenticate to GraphCTF
 * 
 * This endpoint should only be called once the user signs in (With NextAuth) and is ready to join a game
 */

//Imports
import authenticate from '@/lib/graphctf/authenticate';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) =>
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

  //Validate body
  const code = req.body.code;
  if (code == null || code.length < 1 || code.length > 100)
  {
    return res.status(422).json({
      error: {
        name: 'Invalid body',
        description: 'Property "code" must be defined and be 1-100 characters long!'
      }
    });
  }

  //Authenticate to GraphCTF
  const sessionToken = authenticate(
    code,
    session.user!.name!
  );

  //Save the token
  session.graphCtfToken = sessionToken;
};
