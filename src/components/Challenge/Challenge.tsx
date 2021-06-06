//Imports
import Handle from '../Handle/Handle';
import Markdown from '../Markdown/Markdown';
import React, {SyntheticEvent, useState} from 'react';
import {Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input} from '@chakra-ui/react';
import {Resizable, ResizeCallbackData} from 'react-resizable';
import {useSizes} from 'react-use-sizes';

interface ChallengeProps
{
  name: string;
  text: string;

  isOpen: boolean;
  onClose: () => void;

  onSubmit: (flag: string) => void;
}

const Challenge: React.FC<ChallengeProps> = (props: ChallengeProps) =>
{
  //Reactive window size
  const {windowSize} = useSizes();

  //Drawer state
  const [width, setWidth] = useState(windowSize.width * 0.6);

  //Resize handler
  const onResize = (_: SyntheticEvent, data: ResizeCallbackData) =>
  {
    //Update width
    setWidth(data.size.width);
  };

  //Flag state
  const [flag, setFlag] = useState('');

  //Submit handler
  const onSubmit = () =>
  {
    //Call parent handler
    props.onSubmit(flag);
  };

  return (
    <Drawer isOpen={props.isOpen} onClose={props.onClose} placement='right'>
      <DrawerOverlay />
      <DrawerContent minWidth={width}>
        <Resizable
          axis='x'
          handle={<Handle />}
          handleSize={[20, 20]}
          height={windowSize.height}
          onResize={onResize}
          resizeHandles={['w']}
          width={width}
        >
          <Box marginLeft='20px'>
            <DrawerHeader textAlign="center">{props.name}</DrawerHeader>
            <DrawerCloseButton marginRight='8px' />

            <DrawerBody padding='16px'>
              <Markdown text={props.text} />
            </DrawerBody>

            <DrawerFooter padding='16px'>
              <Input onChange={event => setFlag(event.target.value)} placeholder='Flag' value={flag} />
              <Button colorScheme='primary' onClick={onSubmit} marginLeft='16px'>Submit</Button>
            </DrawerFooter>
          </Box>
        </Resizable>
      </DrawerContent>
    </Drawer>
  );
};

export default Challenge;
