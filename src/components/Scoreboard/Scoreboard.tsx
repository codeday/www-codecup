import 'chartjs-adapter-luxon';
import ColorHash from 'color-hash';
import React, {CSSProperties} from 'react';
import {Box, Heading, Table, Tbody, Td, Th, Thead, Tr, useToken} from '@chakra-ui/react';
import {ChartOptions, ChartData} from 'chart.js/types/index.esm';
import {Line} from 'react-chartjs-2';

/**
 * Row styling
 */
const rowStyle = 
{
  borderColor: 'var(--chakra-colors-gray-500) !important',
  padding: '10px !important'
} as CSSProperties;

//Instantiate a color hasher
const hasher = new ColorHash();

interface ScoreboardProps
{
  items: {
    name: string;
    color?: string;
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

  //Sort items by score
  const items = props.items.sort((itemA, itemB) => {
    //Get item scores
    const itemAScore = itemA.scores[itemA.scores.length - 1].value;
    const itemBScore = itemB.scores[itemB.scores.length - 1].value;

    return itemBScore - itemAScore;
  });

  //Generate graph data
  const graphData = {
    datasets: items.map(item => ({
      label: `${item.name} Score`,

      borderColor: item.color != null ? item.color : hasher.hex(item.name),

      pointStyle: 'crossRot',
      pointRadius: 7,

      data: item.scores.map(score =>
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
          {items.map(item =>
            <Tr key={item.name} style={rowStyle}>
              <Td>{item.name}</Td>
              <Td isNumeric>{item.scores[item.scores.length - 1].value}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Scoreboard;
