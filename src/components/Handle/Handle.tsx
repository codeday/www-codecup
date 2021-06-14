import {ForwardedRef, forwardRef} from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {MoreVertical} from 'react-feather';

const Handle = forwardRef((props, ref) => (
  <Flex align="center" height='100%' left='0' position='absolute' ref={ref as ForwardedRef<HTMLDivElement>} top='0' {...props}>
    <Box backgroundColor='gray.800' cursor='w-resize' roundedRight='md'>
      <MoreVertical height='40px' />
    </Box>
  </Flex>
));

Handle.displayName = 'handle';

export default Handle;
