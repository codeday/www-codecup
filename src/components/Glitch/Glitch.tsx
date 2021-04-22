import {FC, HTMLAttributes} from 'react';
import {Heading} from '@chakra-ui/layout';
import styles from './Glitch.module.css';

interface GlitchProps extends HTMLAttributes<HTMLHeadingElement>
{
  children: string;
  fontSize?: string;
}

const Glitch: FC<GlitchProps> = (props: GlitchProps) => (
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
