import {Box, Flex, Heading} from '@chakra-ui/layout';
import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/table';
import React from 'react';
import styles from './Scoreboard.module.css';

interface ScoreboardProps
{
  teams: {
    name: string;
    score: number;
  }[];
}

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => (
  <Flex align="center" data-testid="NotFound">
    <Box background="gray.800" padding="10px" rounded="xl" textAlign="center" width="30vw" >
      <Heading fontSize="4xl">Scoreboard</Heading>
      <Table variant="simple">
        <Thead>
          <Tr className={styles.Row}>
            <Th>Name</Th>
            <Th textAlign="end">Score</Th>
          </Tr>
        </Thead>
        <Tbody width="100%">
          {props.teams.map((team, index) =>
            <Tr className={styles.Row} key={index}>
              <Td>{team.name}</Td>
              <Td isNumeric>{team.score}</Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr className={styles.Row}>
            <Th>Name</Th>
            <Th textAlign="end">Score</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  </Flex>
);

//TODO: remove this; this is just an example
Scoreboard.defaultProps = {
  teams: [
    {
      name: 'Orion',
      score: 2500
    },
    {
      name: 'Sirius',
      score: 2200
    },
    {
      name: 'Polaris',
      score: 1800
    },
    {
      name: 'Rigel',
      score: 1300
    },
    {
      name: 'Antares',
      score: 500
    },
    {
      name: 'Vega',
      score: 0
    }
  ]
};

export default Scoreboard;
