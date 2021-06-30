/**
 * @fileoverview Index page
 */

/// <reference path="../types.d.ts"/>

//Imports
import React from 'react';
import {Box, Button, Flex, Heading, Text} from '@chakra-ui/react';
import {CmsInfoDocument} from '@/lib/graphql/codeday';
import {GetStaticProps} from 'next';
import {codedayClient} from '@/lib/graphql/apollo';
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
          <Text marginTop="10px">Hello {session.user!.name}!</Text>
        )}
      </Box>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () =>
{
  //Get CMS info
  const {data} = await codedayClient.query({
    query: CmsInfoDocument
  });

  //Extract info
  const info = data!.cms!.programs!.items[0]!;

  return {
    props: {
      name: info.name!,
      description: info.description!
    }
  };
};

export default Index;
