import { Container as ChakraContainer } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <ChakraContainer maxW={'4xl'} py={8}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
