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
import { MemoryForm } from '../MemoryForm';
import PartitionForm from '../PartitionForm';
import ProcessForm from '../ProcessForm';

const memoryInitialState: Memory = {
  size: 0,
  partitions: [],
  available: 0,
};

export const DynamicPartitioning = () => {
  const [memory, setMemory] = useState(memoryInitialState);
  const [waitingProcesses, setWaitingProcesses] = useState<Process[]>([]);
  const [unit, setUnit] = useState<'MB' | 'KB' | 'GB'>('MB');

  const createMemory = (mainMemory: number, soSize: number, memoryUnit: string) => {
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

    if (so.size > mainMemory * 0.3) {
      alert('El tamaño del sistema operativo no puede ser mayor al 30% de la memoria.');
      return;
    }

    const partitions: Partition[] = [
      { size: so.size, process: so, available: 0, id: '0' },
    ];

    setUnit(memoryUnit as 'MB' | 'KB' | 'GB');
    setMemory({
      size: mainMemory,
      partitions,
      available: mainMemory - so.size,
    });
  };

  const totalPartitionsSize = memory.partitions.reduce(
    (total, partition) => total + partition.size,
    0
  );

  const addPartition = (partition: Partition) => {
    if (partition.size >= memory.available) {
      alert('El tamaño de la partición es mayor al tamaño de la memoria disponible.');
      return;
    }

    if (totalPartitionsSize + partition.size > memory.size) {
      alert('El tamaño de las particiones es mayor al tamaño de la memoria.');
      return;
    }

    setMemory({
      ...memory,
      partitions: [...memory.partitions, partition],
    });
  };

  const addProcess = (process: Process) => {
    if (process.size > memory.available) {
      setWaitingProcesses([...waitingProcesses, process]);
      return;
    }

    const bestFitPartition: Partition | null = memory.partitions.reduce(
      (bestFit: Partition | null, partition) => {
        if (!partition.process && partition.available >= process.size) {
          if (!bestFit || partition.available < bestFit.available) {
            return partition;
          }
        }
        return bestFit;
      },
      null
    );

    if (bestFitPartition) {
      bestFitPartition.process = process;
      bestFitPartition.available = bestFitPartition.size - process.size;

      setMemory({
        ...memory,
        partitions: memory.partitions.map((p) =>
          p.id === bestFitPartition.id ? bestFitPartition : p
        ),
        available: memory.available - process.size,
      });

      return;
    }

    setWaitingProcesses([...waitingProcesses, process]);
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

  const removeFromWaitingList = (process: Process) => {
    const index = waitingProcesses.findIndex((p) => p.id === process.id);

    if (index === -1) return;

    waitingProcesses.splice(index, 1);

    setWaitingProcesses([...waitingProcesses]);
  };

  return (
    <Box>
      <Heading fontSize={'xl'} mt={6}>
        Simulador de memoria dinámica
      </Heading>
      {memory.size === 0 && <MemoryForm handleCreateMemory={createMemory} />}
      <Divider my={6} />

      {memory.size !== 0 && (
        <>
          <ProcessForm handleAddProcess={addProcess} unit={unit}></ProcessForm>
          <Divider mt={6} mb={3} />
          <SimpleGrid columns={2}>
            <Box>
              <Heading fontSize={'xl'}>Memoria Principal</Heading>
              <Box mt={2}>
                <Stack mt={4} gap={2}>
                  {memory.partitions.map((partition, index) => {
                    return (
                      <Flex key={partition.id} alignItems={'start'} gap={4}>
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
                            {partition.size - partition.available} {unit} de{' '}
                            {partition.size} {unit}
                          </Text>
                          {partition.process !== null && (
                            <Text lineHeight={1} opacity={0.7}>
                              {partition.available} {unit} de desperdicio
                            </Text>
                          )}
                          <Text>
                            {partition.process ? partition.process.name : 'Libre'}
                          </Text>
                        </Stack>
                        {partition.process && index !== 0 && (
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
                  <Flex alignItems={'start'} gap={4}>
                    <Flex
                      border='3px solid white'
                      bg={'transparent'}
                      height={((memory.available * 100) / memory.size) * 8 + 'px'}
                      mt={2}
                      w={12}
                      rounded={'lg'}
                      alignItems={'end'}
                      overflow={'hidden'}
                    >
                      <Box
                        bg={'transparent'}
                        height={'100%'}
                        w={'full'}
                        border='3px solid white'
                      />
                    </Flex>

                    <Stack mt={3}>
                      <Text lineHeight={0.5} fontSize={'2xl'}>
                        {memory.size - totalPartitionsSize} {unit}
                      </Text>
                      <Text>Sin asignar (no tiene partición)</Text>
                    </Stack>
                  </Flex>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Heading fontSize={'xl'}>Lista de espera</Heading>
              <Stack mt={2} gap={2} border={4}>
                {waitingProcesses.map((process) => (
                  <Flex key={process.id} alignItems={'start'} gap={4}>
                    <Box
                      bg={process.color}
                      rounded={'lg'}
                      height={((process.size * 100) / memory.size) * 8}
                      w={12}
                    />
                    <Stack mt={2}>
                      <Text lineHeight={0.5} fontSize={'2xl'}>
                        {process.size} {unit}
                      </Text>
                      <Text>{process.name}</Text>
                    </Stack>
                    <IconButton
                      mt={1}
                      aria-label='Eliminar proceso'
                      icon={<FiX />}
                      onClick={() => removeFromWaitingList(process as Process)}
                      rounded={'full'}
                      size={'xs'}
                    />
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
