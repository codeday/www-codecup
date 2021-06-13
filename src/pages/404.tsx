import React from 'react';
import Error from '@/components/Error/Error';

const NotFound: React.FC = () => (
  <Error title="Page not found" description="The requested page does not exist. If a link provided by CodeDay brought you here, please contact CodeDay staff."/>
);

export default NotFound;
