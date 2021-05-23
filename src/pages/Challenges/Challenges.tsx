import Challenge from '../../components/Challenge/Challenge';
import Map, {Transform} from '../../components/Map/Map';
import React, {useState} from 'react';
import Search from '../../components/Search/Search';
import {Box, Flex, Heading, useDisclosure} from '@chakra-ui/react';
import {Point} from 'react-simple-maps';

/**
 * How far to zoom in to a location when searched and selected
 */
const locationZoom = 4;

export interface Challenge
{
  id: string;
  name: string;
  value: number;
  tags: string[];
  coordinates: Point;
  text: string;
}

interface ChallengesProps
{
  challenges: Challenge[];
}

const Challenges: React.FC<ChallengesProps> = (props: ChallengesProps) =>
{
  //Map transformation
  const [transform, setTransform] = useState<Transform>({
    coordinates: [0, 0],
    zoom: 1
  });

  //Map transform handler
  const onTransform = (newTransform: Transform) =>
  {
    //Update transform
    setTransform(newTransform);
  };

  //Challenge state
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [challenge, setChallenge] = useState<Challenge>();

  //Challenge selected handler
  const challengeSelected = (id: string) =>
  {
    //Find the challenge by its ID
    const challenge = props.challenges.find(challenge => challenge.id == id);

    if (challenge == null)
    {
      throw new Error(`Failed to find challenge ${id}`);
    }

    //Update the transform
    setTransform({
      coordinates: challenge.coordinates,
      zoom: locationZoom
    });

    //Update the challenge
    setChallenge(challenge);

    //Open the modal
    onOpen();
  };

  //Submission handler
  const onSubmit = (flag: string) =>
  {
    //TODO: replace with API call
    alert(`Submission: ${flag}`);
  };

  return (
    <Flex align="center" data-testid="NotFound">
      <Box background="gray.800" padding="10px" rounded="xl" textAlign="center" width="70vw" >
        <Heading fontSize="4xl">Challenges</Heading>

        <Search items={props.challenges} itemSelected={challengeSelected} />

        <Map markers={props.challenges} markerSelected={challengeSelected} onTransform={onTransform} transform={transform} />
      </Box>

      <Challenge name={challenge?.name || ''} text={challenge?.text || ''} isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
    </Flex>
  );
};

//TODO: remove this; this is just an example
Challenges.defaultProps = {
  challenges: [
    {
      id: '4838e70f-4113-4869-a508-bc504d345472',
      name: 'Cryptography 1',
      value: 150,
      tags: [
        'Cryptography'
      ],
      coordinates: [-77.0365, 38.8977],
      text: `
# Cryptography
# H1
## H2
### H3
#### H4
##### H5
###### H6

* Unordered list item 1
* Unordered list item 2
* Unordered list item 3

---

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

[Link](https://example.com)

![Alt](https://via.placeholder.com/350x150)

\`Inline code block\`

\`\`\`javascript
//Single-line comment
const arrowFunction = () => null;

/* Multi-
line comment */
function normalFunction()
{
  return null;
}

var a = 0;
let b = 1;
const c = 2;
\`\`\`

Column 1 | Column 2 | Column 3
--- | --- | ---
Row 1 | Row 1 | Row 1
Row 2 | Row 2 | Row 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum
varius. Aenean et tortor at risus viverra adipiscing at.`
    },
    {
      id: '70c405a8-c7c7-4f28-a7fd-04d73a3ab18a',
      name: 'Steganography 1',
      value: 500,
      tags: [
        'Steganography'
      ],
      coordinates: [2.2945, 48.858222],
      text: `
*Check \`Cryptography 1\` for a full markdown sample*
`
    },
    {
      id: 'b7b1f035-a919-4c4f-8d9e-5990c148c3ba',
      name: 'Web 1',
      value: 50,
      tags: [
        'Web'
      ],
      coordinates: [31.132778, 29.976111],
      text: `
*Check \`Cryptography 1\` for a full markdown sample*
`
    }
  ]
};

export default Challenges;
