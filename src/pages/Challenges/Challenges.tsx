import Challenge from '../../components/Challenge/Challenge';
import Map from '../../components/Map/Map';
import React, {useState} from 'react';
import Search from '../../components/Search/Search';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {Point} from 'react-simple-maps';

/**
 * How far to zoom in to a location when searched and selected
 */
const locationZoom = 4;

interface ChallengesProps
{
  challenges: {
    id: string;
    name: string;
    value: number;
    tags: string[];
    coordinates: Point;
    text: string;
  }[];
}

const Challenges: React.FC<ChallengesProps> = (props: ChallengesProps) =>
{
  //Map state
  const [location, setLocation] = useState<Point>([0, 0]);
  const [zoom, setZoom] = useState<number>(1);

  //Search item selected handler
  const itemSelected = (id: string) =>
  {
    //Find the item by its ID
    const item = props.challenges.find(item => item.id == id);

    if (item == null)
    {
      throw new Error(`Failed to find item ${id}`);
    }

    //Update the location
    setLocation(item.coordinates);

    //Update the zoom
    setZoom(locationZoom);
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

        <Search items={props.challenges} itemSelected={itemSelected} />

        <Map center={location} markers={props.challenges} zoom={zoom} />
      </Box>

      <Challenge name="Cryptography 1" text={props.challenges[0].text} isOpen={true} onSubmit={onSubmit} />
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
