//Imports
import Handle from '@/components/Handle/Handle';
import Markdown from '@/components/Markdown/Markdown';
import React, {SyntheticEvent, useState} from 'react';
import {Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input} from '@chakra-ui/react';
import {Resizable, ResizeCallbackData} from 'react-resizable';
import {useWindowSize} from '@reach/window-size';

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
  const {height: windowHeight, width: windowWidth} = useWindowSize();

  //Drawer state
  const [drawerWidth, setDrawerWidth] = useState(windowWidth * 0.6);

  //Resize handler
  const onResize = (_: SyntheticEvent, data: ResizeCallbackData) =>
  {
    //Update width
    setDrawerWidth(data.size.width);
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
      <DrawerContent minWidth={drawerWidth}>
        <Resizable
          axis='x'
          handle={<Handle />}
          handleSize={[20, 20]}
          height={windowHeight}
          onResize={onResize}
          resizeHandles={['w']}
          width={drawerWidth}
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
