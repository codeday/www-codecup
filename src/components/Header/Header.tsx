import {Box, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text} from '@chakra-ui/react';
import {BarChart2, Flag, Info} from 'react-feather';
import Link from 'next/link';
import Glitch from '../Glitch/Glitch';
import logo from '../../logo.svg';
import React from 'react';

interface HeaderProps
{
  yourName: string;
  teamName: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => (
  <Flex align="center" as="header" justifyContent="space-between" padding="5px" width="100%" wrap="wrap">
    <Link href="/">
      <Stack align="center" direction="row">
        <Box marginRight="20px">
          <img alt="Code Cup Logo" src={logo} width="48" />
        </Box>

        <Glitch fontSize="5xl">CodeCup</Glitch>
      </Stack>
    </Link>

    <Stack direction="row" left="50%" position="absolute" transform="translateX(-50%)">
      <Link href="/challenges">
        <Button colorScheme="primary" leftIcon={<Flag />}>Challenges</Button>
      </Link>
      <Link href="/scoreboard">
        <Button colorScheme="secondary" leftIcon={<BarChart2 />}>Scoreboard</Button>
      </Link>
    </Stack>

    <Box>
      <Popover placement="left-end" trigger="hover">
        <PopoverTrigger>
          <Info cursor="pointer" />
        </PopoverTrigger>
        <PopoverContent width="fit-content">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Info</PopoverHeader>
          <PopoverBody>
            <Text>Your Name: {props.yourName}</Text>
            <Text>Team Name: {props.teamName}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  </Flex>
);

export default Header;
