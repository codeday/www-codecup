import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from '@chakra-ui/react';

interface ChallengeProps
{
  name: string;
  body: string;
  isOpen: boolean;
}

const Challenge: React.FC<ChallengeProps> = (props: ChallengeProps) =>
{
  //Modal state
  const {isOpen, onClose, onOpen} = useDisclosure();
  useEffect(() =>
  {
    if (props.isOpen)
    {
      onOpen();
    }
    else
    {
      onClose();
    }
  }, [props.isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="60vw">
        <ModalHeader textAlign="center">{props.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <ReactMarkdown>{props.body}</ReactMarkdown>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Challenge;
