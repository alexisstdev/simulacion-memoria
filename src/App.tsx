import { Route, Routes } from 'react-router-dom';
import Container from './Components/Container';
import { DynamicPartitioning } from './Components/DynamicPartitioning/DynamicPartitioning';
import { FixedPartitioning } from './Components/FixedPartitioning/FixedPartitioning';
import Home from './Components/Home';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/estatica' element={<FixedPartitioning />} />
        <Route path='/dinamica' element={<DynamicPartitioning />} />
      </Routes>
    </Container>
  );
}

export default App;
