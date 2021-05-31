/**
 * @fileoverview Index page
 */

/// <reference path="../types.d.ts"/>

//Imports
import * as queries from './index.gql';
import React from 'react';
import client from '../apollo';
import {Box, Button, Flex, Heading, Text} from '@chakra-ui/react';
import {GetStaticProps} from 'next';
import {signIn, useSession} from 'next-auth/client';

interface IndexProps
{
  name: string;
  description: string;
}

const Index: React.FC<IndexProps> = (props: IndexProps) =>
{
  //Session
  const [session] = useSession();

  return (
    <Flex align="center" data-testid="About">
      <Box padding="10px" textAlign="center" width="50vw">
        <Heading fontSize="4xl">{props.name}</Heading>
        <Text marginTop="10px">{props.description}</Text>

        {session == null ? (
          <Button colorScheme='primary' onClick={() => signIn('auth0')} marginTop="10px">Login</Button>
        ) : (
          <Text marginTop="10px">Hello {session.user.name}!</Text>
        )}
      </Box>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async ctx =>
{
  //Get CMS info
  const {data} = await client.query({
    query: queries.CmsInfo
  });

  //Extract info
  const info = data.cms.programs.items[0];

  return {
    props: info
  };
};

export default Index;
