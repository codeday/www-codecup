import {Heading} from '@chakra-ui/layout';
import React from 'react';
import styles from './Glitch.module.css';

interface GlitchProps
{
  className?: string;
  children: string;
  fontSize?: string;
}

const Glitch: React.FC<GlitchProps> = (props: GlitchProps) => (
  <Heading
    data-text={props.children}
    className={styles.text + ' ' + props.className}
    data-testid="Glitch"
    display="inline-block"
    fontSize={props.fontSize}
  >{props.children}</Heading>
);

Glitch.defaultProps = {
  children: 'Default glitch text',
  fontSize: '3xl'
};

export default Glitch;
