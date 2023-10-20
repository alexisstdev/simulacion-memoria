import { Divider, Heading, Text } from '@chakra-ui/react';
import Container from './Components/Container';
import { FixedPartitioning } from './Components/FixedPartitioning/FixedPartitioning';

function App() {
  return (
    <Container>
      <Heading>Sistemas operativos</Heading>
      <Text mt={2}>Alexis Sanmiguel Torres - 21100288</Text>
      <Divider my={6} />
      <FixedPartitioning />
    </Container>
  );
}

export default App;
