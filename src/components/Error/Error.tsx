//Imports
import Link from 'next/link';
import React from 'react';
import {Button, Flex, Heading, Stack, Text} from '@chakra-ui/react';
import {Home} from 'react-feather';

interface ErrorProps
{
  title: string;
  description: string;
}

const Error: React.FC<ErrorProps> = (props: ErrorProps) => (
  <Flex align="center" data-testid="NotFound">
    <Stack align="center" justify="center" padding="10px" textAlign="center" width="40vw">
      <Heading fontSize="4xl">{props.title}</Heading>
      <Text>{props.description}</Text>
      <Link href="/">
        <Button colorScheme="primary" leftIcon={<Home />}>Take me home</Button>
      </Link>
    </Stack>
  </Flex>
);

export default Error;
