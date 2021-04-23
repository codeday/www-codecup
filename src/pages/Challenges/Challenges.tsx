import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Grid, Heading, Input, InputGroup, InputLeftAddon, Stack, Text} from '@chakra-ui/react';
import React, {ReactNode} from 'react';
import {Globe, Image, Key, Search} from 'react-feather';
import Challenge from '../../components/Challenge/Challenge';

//TODO: remove this; this is just an example
const exampleBody = `
# H1
## H2
### H3
#### H4
##### H5
###### H6

[Link](https://example.com)

![Alt](https://via.placeholder.com/350x150)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum
varius. Aenean et tortor at risus viverra adipiscing at. Scelerisque eu ultrices
vitae auctor. Non nisi est sit amet. A scelerisque purus semper eget duis at
tellus at urna. Odio ut enim blandit volutpat. Nisl pretium fusce id velit ut.
Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Diam maecenas
ultricies mi eget. Sapien eget mi proin sed libero. Et tortor at risus viverra
adipiscing. Tempor nec feugiat nisl pretium fusce id velit.
`;

interface ChallengesProps
{
  categories: {
    icon: ReactNode;
    name: string;
    challenges: {
      name: string;
      value: string;
    }[];
  }[];
}

const Challenges: React.FC<ChallengesProps> = (props: ChallengesProps) => (
  <Flex align="center" data-testid="NotFound">
    <Box background="gray.800" padding="10px" rounded="xl" textAlign="center" width="70vw" >
      <Heading fontSize="4xl">Challenges</Heading>

      <InputGroup margin="20px 0">
        <InputLeftAddon>
          <Search />
        </InputLeftAddon>
        <Input />
      </InputGroup>

      <Accordion allowMultiple={true} allowToggle={true}>
        {props.categories.map((category, categoryIndex) =>
          <AccordionItem key={categoryIndex}>
            <AccordionButton>
              <Stack align="center" direction="row" width="100%">
                {category.icon}
                <Heading fontSize="2xl">{category.name}</Heading>
                <AccordionIcon marginLeft="auto !important" />
              </Stack>
            </AccordionButton>

            <AccordionPanel paddingTop="var(--chakra-space-5)">
              <Grid gap={2} templateColumns="repeat(5, 1fr)" templateRows="repeat(1, 1fr)">
                {category.challenges.map((challenge, challengeIndex) =>
                  <Box background="gray.700" cursor="pointer" key={challengeIndex} padding="10px" rounded="xl" width="100%">
                    <Text>{challenge.name}</Text>
                    <Text>{challenge.value}</Text>
                  </Box>
                )}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </Box>

    <Challenge name="Cryptography 1" body={exampleBody} isOpen={true}/>
  </Flex>
);

//TODO: remove this; this is just an example
Challenges.defaultProps = {
  categories: [
    {
      icon: <Key />,
      name: 'Cryptography',
      challenges: Array(3).fill({
        name: 'Cryptography Challenge',
        value: 150
      })
    },
    {
      icon: <Image />,
      name: 'Steganography',
      challenges: Array(8).fill({
        name: 'Steganography Challenge',
        value: 500
      })
    },
    {
      icon: <Globe />,
      name: 'Web',
      challenges: Array(20).fill({
        name: 'Web Challenge',
        value: 50
      })
    }
  ]
};

export default Challenges;
