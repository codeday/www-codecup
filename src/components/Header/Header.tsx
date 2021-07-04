/// <reference types="next-images"/>

import Glitch from '@/components/Glitch/Glitch';
import Link from 'next/link';
import React from 'react';
import logo from '@/logo.svg';
import {BarChart2, Flag} from 'react-feather';
import {Box, Button, Flex, Img, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text} from '@chakra-ui/react';
import {useSession} from 'next-auth/client';

const Header: React.FC = () =>
{
  //Session
  const [session] = useSession();

  return (
    <Flex align="center" as="header" justifyContent="space-between" padding="5px" width="100%" wrap="wrap">
      <Link href="/">
        <button>
          <Stack align="center" direction="row">
            <Box marginRight="20px">
              <img alt="Code Cup Logo" src={logo} width="48" />
            </Box>

            <Glitch fontSize="5xl">CodeCup</Glitch>
          </Stack>
        </button>
      </Link>

      <Stack direction="row" left="50%" position="absolute" transform="translateX(-50%)">
        <Link href="/challenges">
          <Button colorScheme="primary" leftIcon={<Flag />}>Challenges</Button>
        </Link>
        <Link href="/scoreboard">
          <Button colorScheme="secondary" leftIcon={<BarChart2 />}>Scoreboard</Button>
        </Link>
      </Stack>

      {session != null && (
        <Box>
          <Popover placement="left-end" trigger="click">
            <PopoverTrigger>
              <Img borderRadius="100%" cursor="pointer" src={session.user!.image!} width={16} />
            </PopoverTrigger>
            <PopoverContent width="fit-content">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Info</PopoverHeader>
              <PopoverBody textAlign="center">
                <Text>Hello {session.user!.name}!</Text>
                <Text>You're on the _FILL_ME_IN_ team.</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
