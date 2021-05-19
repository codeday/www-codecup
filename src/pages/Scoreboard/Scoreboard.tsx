import 'chartjs-adapter-luxon';
import React from 'react';
import styles from './Scoreboard.module.css';
import {Box, Flex, Heading} from '@chakra-ui/layout';
import {ChartOptions, ChartData} from 'chart.js/types/index.esm';
import {Line} from 'react-chartjs-2';
import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/table';

/**
 * Options for the graph
 */
const graphOptions = {
  scales: {
    x: {
      type: 'timeseries',
      time: {
        unit: 'minute'
      }
    }
  }
} as ChartOptions<'line'>;

interface ScoreboardProps
{
  teams: {
    name: string;
    scores: {
      time: Date;
      value: number;
    }[];
  }[];
}

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) =>
{
  //Generate graph data
  const graphData = {
    datasets: props.teams.map(team => ({
      label: `${team.name} Score`,
      data: team.scores.map(score =>
      {
        //Get the minutes
        const minutes = score.time.getTime() / (1000 * 60);

        return {
          x: minutes,
          y: score.value
        };
      })
    }))
  } as ChartData;

  return (
    <Flex align="center" data- testid="NotFound" >
      <Box background="gray.800" padding="10px" rounded="xl" textAlign="center" width="30vw" >
        <Heading fontSize="4xl">Scoreboard</Heading>

        <Line data={graphData} options={graphOptions} type="line" />

        <Table variant="simple">
          <Thead>
            <Tr className={styles.Row}>
              <Th>Name</Th>
              <Th textAlign="end">Score</Th>
            </Tr>
          </Thead>
          <Tbody width="100%">
            {props.teams.map(team =>
              <Tr className={styles.Row} key={team.name}>
                <Td>{team.name}</Td>
                <Td isNumeric>{team.scores[team.scores.length - 1].value}</Td>
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
    </Flex >
  );
};

//TODO: remove this; this is just an example
Scoreboard.defaultProps = {
  teams: [
    'Orion',
    'Sirius',
    'Polaris',
    'Rigel',
    'Antares',
    'Vega'
  ].map(name =>
  {
    //Generate a bunch of random scores
    const scores = [];

    for (let i = 0; i < 10; i++)
    {
      scores.push({
        time: new Date(86_400 * i),
        value: Math.round(10_000 * Math.random())
      });
    }

    return {
      name,
      scores
    };
  })
};

export default Scoreboard;
