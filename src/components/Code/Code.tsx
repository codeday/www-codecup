import React, {useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {Button, Code as ChakraCode} from '@chakra-ui/react';
import {CheckSquare, Copy} from 'react-feather';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeProps
{
  children: string;
  inline?: boolean;
  language?: string;
}

const Code: React.FC<CodeProps> = (props: CodeProps) =>
{
  //Inline code blocks
  if (props.inline)
  {
    return (
      <ChakraCode borderRadius='3px' padding='4px'>{props.children}</ChakraCode>
    );
  }
  //Multiline code blocks
  else
  {
    //Remove empty last lines
    const text = props.children.replace(/[\r\n]{1,2}$/, '');

    //Copy icon state
    const [isCopied, setIsCopied] = useState(false);

    //Copy handler
    const onCopy = async () =>
    {
      //Copy the text
      await navigator.clipboard.writeText(text);

      //Set the copied
      setIsCopied(true);

      //Clear
      setTimeout(() => setIsCopied(false), 1000);
    };

    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button colorScheme={isCopied ? 'green' : 'primary'} display='inline-block' margin='10px' onClick={onCopy} position='absolute' right={0} transitionDuration='var(--chakra-transition-duration-ultra-slow)'>
            {isCopied ? <CheckSquare /> : <Copy />}
          </Button>
        </div>

        <SyntaxHighlighter customStyle={{borderRadius: '10px'}} language={props.language} showLineNumbers={true} style={atomOneDark}>
          {text}
        </SyntaxHighlighter>
      </div>
    );
  }
};

Code.defaultProps = {
  inline: false
};

export default Code;
