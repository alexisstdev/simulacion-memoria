import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Memory, Partition, Process } from '../../types/types';
import { MemoryForm } from './MemoryForm';
import ProcessForm from './ProcessForm';

/* const memoryExample: Memory = {
  size: 100,
  partitions: [
    {
      id: 0,
      size: 10,
      process: { name: 'Sistema operativo', size: 10, id: '1', color: '#FFFFFF' },
      available: 0,
    },
    {
      id: 1,
      size: 30,
      process: { name: 'Word', size: 10, id: '2', color: randomColor() },
      available: 20,
    },
    {
      id: 2,
      size: 30,
      process: { name: 'Excel', size: 20, id: '3', color: randomColor() },
      available: 10,
    },
    {
      id: 3,
      size: 30,
      process: { name: 'VS Code', size: 30, id: '4', color: randomColor() },
      available: 0,
    },
  ],
  available: 30,
}; */

const memoryInitialState: Memory = {
  size: 0,
  partitions: [],
  available: 0,
};

export const FixedPartitioning = () => {
  const [memory, setMemory] = useState(memoryInitialState);
  const [waitingProcesses, setWaitingProcesses] = useState<Process[]>([]);

  const availableMemory = memory.available;

  const occupiedMemory = memory.size - memory.available;

  const createMemory = (mainMemory: number, soSize: number) => {
    const so: Process = {
      size: soSize,
      name: 'Sistema operativo',
      id: crypto.randomUUID(),
      color: '#FFFFFF',
    };

    if (so.size > mainMemory) {
      alert('El tamaño del sistema operativo es mayor al tamaño de la memoria.');
      return;
    }

    const partitions: Partition[] = [{ size: so.size, process: so, available: 0, id: 0 }];

    let memorySize = mainMemory - so.size;

    while (memorySize > 0) {
      const currentPartitions = partitions.length + 1;
      const message = `Ingrese el tamaño de la partición ${currentPartitions} en MB, memoria restante ${memorySize} MB`;

      const response = prompt(message);

      if (response === null) return;

      const partitionSize = Number(response);

      if (isNaN(partitionSize)) {
        alert('El tamaño de la partición debe ser un número.');
        continue;
      }

      if (partitionSize <= 0) {
        alert('El tamaño de la partición no puede ser igual o menor a 0.');
        continue;
      }

      if (partitionSize > memorySize) {
        alert('El tamaño de la partición es mayor al tamaño de la memoria.');
        continue;
      }

      partitions.push({
        size: partitionSize,
        process: null,
        available: partitionSize,
        id: currentPartitions - 1,
      });
      memorySize -= partitionSize;
    }

    setMemory({ size: mainMemory, partitions, available: mainMemory - so.size });
  };

  const addProcess = (process: Process) => {
    const availablePartition = memory.partitions.find(
      (partition) => !partition.process && partition.size >= process.size
    );

    if (availablePartition) {
      availablePartition.process = process;

      availablePartition.available -= process.size;

      setMemory({
        ...memory,
        partitions: memory.partitions.map((partition) =>
          partition.id === availablePartition.id ? availablePartition : partition
        ),
        available: memory.available - process.size,
      });
    } else {
      setWaitingProcesses([...waitingProcesses, process]);
    }
  };

  const removeProcess = (process: Process) => {
    const partition = memory.partitions.find(
      (partition) => partition.process?.id === process.id
    );

    if (!partition) return;

    partition.process = null;
    partition.available = partition.size;

    setMemory({
      ...memory,
      partitions: memory.partitions.map((p) => (p.id === partition.id ? partition : p)),
      available: memory.available + process.size,
    });

    const waitingProcess = waitingProcesses.shift();

    if (waitingProcess) addProcess(waitingProcess);

    setWaitingProcesses([...waitingProcesses]);
  };

  return (
    <Box>
      <Heading fontSize={'xl'} mt={6}>
        Simulador de memoria estática
      </Heading>
      <Divider my={6} />
      {memory.size === 0 && <MemoryForm handleCreateMemory={createMemory} />}
      {memory.size !== 0 && (
        <>
          <ProcessForm handleAddProcess={addProcess}></ProcessForm>
          <Divider mt={6} mb={3} />
          <SimpleGrid columns={2}>
            <Box>
              <Heading fontSize={'xl'}>Memoria Principal</Heading>
              <Box mt={2}>
                <Flex alignItems={'end'} gap={2}>
                  <Heading fontSize={'2xl'}>{availableMemory} MB</Heading>
                  <Text>Disponibles</Text>
                </Flex>
                <Flex alignItems={'end'} gap={2}>
                  <Heading fontSize={'2xl'}>{occupiedMemory} MB</Heading>
                  <Text>Ocupados</Text>
                </Flex>
                <Stack mt={4} gap={2}>
                  {memory.partitions.map((partition, index) => {
                    return (
                      <Flex key={index} alignItems={'start'} gap={4}>
                        <Flex
                          border='3px solid white'
                          bg={'transparent'}
                          height={((partition.size * 100) / memory.size) * 8 + 'px'}
                          mt={2}
                          w={12}
                          rounded={'lg'}
                          alignItems={'end'}
                          overflow={'hidden'}
                        >
                          <Box
                            bg={
                              (partition.process && partition.process.color) ??
                              'transparent'
                            }
                            height={
                              ((partition.size - partition.available) * 100) /
                                partition.size +
                              '%'
                            }
                            w={'full'}
                          />
                        </Flex>

                        <Stack mt={3}>
                          <Text lineHeight={0.5} fontSize={'2xl'}>
                            {partition.size - partition.available} MB de {partition.size}{' '}
                            MB
                          </Text>
                          <Text>
                            {partition.process ? partition.process.name : 'Libre'}
                          </Text>
                        </Stack>
                        {partition.process && partition.id !== 0 && (
                          <IconButton
                            aria-label='Eliminar proceso'
                            mt={2}
                            icon={<FiX />}
                            onClick={() => removeProcess(partition.process as Process)}
                            rounded={'full'}
                            size={'xs'}
                          />
                        )}
                      </Flex>
                    );
                  })}
                </Stack>
              </Box>
            </Box>
            <Box>
              <Heading fontSize={'xl'}>Lista de espera</Heading>
              <Stack mt={2} gap={2}>
                {waitingProcesses.map((process, index) => (
                  <Flex key={index} alignItems={'center'} gap={4}>
                    <Box
                      bg={process.color}
                      rounded={'lg'}
                      height={((process.size * 100) / memory.size) * 8}
                      w={12}
                    />
                    <Stack mt={3}>
                      <Text lineHeight={0.5} fontSize={'2xl'}>
                        {process.size} MB
                      </Text>
                      <Text>{process.name}</Text>
                    </Stack>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};
