/**
 * @fileoverview Index page
 */

/// <reference path="../types.d.ts"/>

//Imports
import React, {useState} from 'react';
import {Box, Button, Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Text} from '@chakra-ui/react';
import {CmsInfoDocument} from '@/lib/graphql/codeday';
import {GetStaticProps} from 'next';
import {codedayClient} from '@/lib/graphql/apollo';
import {getSession, signIn, useSession} from 'next-auth/client';
import {Key, LogIn} from 'react-feather';

interface IndexProps
{
  name: string;
  description: string;
}

const Index: React.FC<IndexProps> = (props: IndexProps) =>
{
  //Session
  const [session] = useSession();

  //Team code
  const [teamCode, setTeamCode] = useState('');

  //Join team handler
  const join = async () =>
  {
    //Request body
    const body = {
      code: teamCode
    };

    //Execute the request
    const res = await fetch('/api/graphctf/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    //Handle error
    if (res.status != 200)
    {
      console.error('Unexpected response while authenticating to GraphCTF!', res.body);
      return;
    }

    //Parse as JSON
    const data = await res.json();

    //Save session token to local storage
    localStorage.setItem('graphctf-token', data.token);
  };

  return (
    <Flex align="center" data-testid="About">
      <Box padding="10px" textAlign="center" width="50vw">
        <Heading fontSize="4xl">{props.name}</Heading>
        <Text marginTop="10px">{props.description}</Text>

        {session == null ? (
          <Button colorScheme='primary' onClick={() => signIn('auth0')} marginTop="40px">Login</Button>
        ) : (
          <div>
            <Text marginTop="40px">Enter a team code to continue</Text>

            <InputGroup marginTop="10px">
              <InputLeftAddon>
                <Key />
              </InputLeftAddon>

              <Input onChange={event => setTeamCode(event.target.value)} value={teamCode} />

              <InputRightAddon padding={0}>
                <Button colorScheme="primary" onClick={join} roundedStart={0}>
                  <LogIn />
                </Button>
              </InputRightAddon>
            </InputGroup>
          </div>
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
