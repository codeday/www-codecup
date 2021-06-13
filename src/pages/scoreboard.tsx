import ScoreboardComponent from '@/components/Scoreboard/Scoreboard';
import {Flex} from '@chakra-ui/react';

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

const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps) => (
    <Flex align="center" data-testid="NotFound" >
      <ScoreboardComponent items={props.teams} />
    </Flex >
  );

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
