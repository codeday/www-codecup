import {ForwardedRef, forwardRef} from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {MoreVertical} from 'react-feather';

const Handle = forwardRef((props, ref) =>
{
  //Filter props (https://github.com/react-grid-layout/react-resizable/issues/175)
  const filteredProps = Object.keys(props)
    .filter(key => key != 'handleAxis')
    .reduce((obj, key) => ({
      ...obj,
      [key]: props[key as keyof typeof props]
    }), {});

  return (
    <Flex align="center" height='100%' left='0' position='absolute' ref={ref as ForwardedRef<HTMLDivElement>} top='0' {...filteredProps}>
      <Box backgroundColor='gray.800' cursor='w-resize' roundedRight='md'>
        <MoreVertical height='40px' />
      </Box>
    </Flex>
  );
});

Handle.displayName = 'handle';

export default Handle;
