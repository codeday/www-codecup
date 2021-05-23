//Imports
import Components from './Components';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkGFM from 'remark-gfm';

interface MarkdownProps
{
  text: string;
}

const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => (
  <ReactMarkdown
    components={Components}
    remarkPlugins={[RemarkGFM]}
  >{props.text}</ReactMarkdown>
);

export default Markdown;
