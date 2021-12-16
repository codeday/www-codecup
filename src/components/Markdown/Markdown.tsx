//Imports
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkGFM from 'remark-gfm';

interface MarkdownProps
{
  text: string;
}

const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => (
  <ReactMarkdown
    components={ChakraUIRenderer()}
    remarkPlugins={[RemarkGFM]}
  >{props.text}</ReactMarkdown>
);

export default Markdown;
