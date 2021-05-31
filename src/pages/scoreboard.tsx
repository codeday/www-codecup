import 'chartjs-adapter-luxon';
import React, {CSSProperties} from 'react';
import {Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, useToken} from '@chakra-ui/react';
import {ChartOptions, ChartData} from 'chart.js/types/index.esm';
import {Line} from 'react-chartjs-2';

const rowStyle = 
{
  borderColor: 'var(--chakra-colors-gray-500) !important',
  padding: '10px !important'
} as CSSProperties;

//Get a random color from the Chakra theme
const randomColor = (): string =>
{
  //Acceptable colors
  const colors = [
    'red',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

  //Acceptable shades
  const shades = [
    300,
    400,
    500,
    600
  ];

  //Select a random color and shade
  const color = colors[Math.floor(Math.random() * colors.length)];
  const shade = shades[Math.floor(Math.random() * shades.length)];

  //Generate the token
  const token = `${color}.${shade}`;

  //Get the color
  return useToken('colors', token);
};

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
  /**
   * Options for the graph
   */
  const graphOptions = {
    plugins: {
      legend: {
        labels: {
          color: useToken('colors', 'whiteAlpha.900'),
          font: {
            family: useToken('fonts', 'body'),
            size: 16
          },
          
          pointStyle: 'crossRot',
          boxWidth: 10,
          usePointStyle: true
        }
      }
    },
    scales: {
      x: {
        type: 'timeseries',
        time: {
          unit: 'minute'
        }
      }
    }
  } as ChartOptions<'line'>;

  //Sort teams by score
  const teams = props.teams.sort((teamA, teamB) => {
    //Get team scores
    const teamAScore = teamA.scores[teamA.scores.length - 1].value;
    const teamBScore = teamB.scores[teamB.scores.length - 1].value;

    return teamBScore - teamAScore;
  });

  //Generate graph data
  const graphData = {
    datasets: teams.map(team => ({
      label: `${team.name} Score`,

      borderColor: randomColor(),

      pointStyle: 'crossRot',
      pointRadius: 7,

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
    <Flex align="center" data-testid="NotFound" >
      <Box padding="10px" textAlign="center">
        <Heading fontSize="4xl">Scoreboard</Heading>

        <div style={{
          width: '60vw'
        }}>
          <Line data={graphData} options={graphOptions} type="line" />
        </div>

        <Table variant="simple">
          <Thead>
            <Tr style={rowStyle}>
              <Th>Name</Th>
              <Th textAlign="end">Score</Th>
            </Tr>
          </Thead>
          <Tbody width="100%">
            {teams.map(team =>
              <Tr key={team.name} style={rowStyle}>
                <Td>{team.name}</Td>
                <Td isNumeric>{team.scores[team.scores.length - 1].value}</Td>
              </Tr>
            )}
          </Tbody>
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
