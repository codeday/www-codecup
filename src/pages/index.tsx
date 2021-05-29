/**
 * @fileoverview Index page
 */

import React from 'react';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

const GET_CMS_INFO = gql`query {
  cms {
    programs(limit: 1, where: { webname: "codecup" } ) {
      items {
        name
        description
      }
    }
  }
}`;

interface CmsInfo
{
  cms: {
    programs: {
      items: [
        {
          name: string;
          description: string;
        }
      ]
    }
  }
}

const Index: React.FC = () =>
{
  //Get CMS info
  const {data} = useQuery<CmsInfo>(GET_CMS_INFO);

  if (data != null)
  {
    //Get the info
    const info = data.cms.programs.items[0];

    return (
      <Flex align="center" data-testid="About">
        <Box padding="10px" textAlign="center" width="70vw">
          <Heading fontSize="4xl">{info.name}</Heading>
          <Text>{info.description}</Text>
        </Box>
      </Flex>
    );
  }
  else
  {
    return null;
  }
};

export default Index;
