import Error from '../components/Error/Error';
import React from 'react';
import {ErrorProps} from 'next/error';

const NotFound: React.FC<ErrorProps> = (props: ErrorProps) => (
  <Error title={`${props.statusCode} error`} description={`An unknown error occurred: ${props.title}. If this error continues to occur, please contact CodeDay staff.`}/>
);

export default NotFound;
