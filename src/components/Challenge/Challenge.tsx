//Imports
import Markdown from '../Markdown/Markdown';
import React, {useState} from 'react';
import {Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/react';

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
  //Flag state
  const [flag, setFlag] = useState('');

  //Submit handler
  const onSubmit = () =>
  {
    //Call parent handler
    props.onSubmit(flag);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent minWidth="60vw">
        <ModalHeader textAlign="center">{props.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody padding='16px'>
          <Markdown text={props.text}/>
        </ModalBody>

        <ModalFooter padding='16px'>
          <Input onChange={event => setFlag(event.target.value)} placeholder='Flag' value={flag} />
          <Button colorScheme='primary' onClick={onSubmit} marginLeft='16px'>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Challenge;
