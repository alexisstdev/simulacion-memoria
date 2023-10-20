import { Heading, Text } from '@chakra-ui/react';
import Container from './Components/Container';
import { FixedPartitioning } from './Components/FixedPartitioning/FixedPartitioning';

function App() {
  return (
    <Container>
      <Heading>Sistemas operativos</Heading>
      <Text mt={2} opacity={0.75}>
        Alexis Sanmiguel Torres - 21100288
      </Text>
      <FixedPartitioning />
    </Container>
  );
}

export default App;
