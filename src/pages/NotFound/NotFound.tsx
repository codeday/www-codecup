import {Button} from '@chakra-ui/button';
import {Flex, Heading, Stack, Text} from '@chakra-ui/layout';
import {Home} from 'react-feather';
import React from 'react';
import {Link} from 'react-router-dom';

const NotFound: React.FC = () => (
  <Flex align="center" data-testid="NotFound">
    <Stack align="center" background="gray.800" justify="center" padding="10px" rounded="xl" textAlign="center" width="40vw">
      <Heading fontSize="4xl">Page not found</Heading>
      <Text>The requested page does not exist. If a link provided by CodeDay brought you here, please contact CodeDay staff.</Text>
      <Link to="/">
        <Button colorScheme="primary" leftIcon={<Home />}>Take me home</Button>
      </Link>
    </Stack>
  </Flex>
);

export default NotFound;
