import {Flex, Link, Text} from '@chakra-ui/react';
import React from 'react';

const Footer: React.FC = () => (
  <Flex align="end" as="footer" bottom="0" justify="center" padding="20px" width="100%">
    <Text textAlign="center">A project of <Link color="primary.300" href="https://codeday.org">CodeDay</Link>.
    Licensed under the <Link color="primary.300" href="https://opensource.org/licenses/MIT">MIT Open Source License</Link>.</Text>
  </Flex>
);

export default Footer;
