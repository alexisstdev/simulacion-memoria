import { Button, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Partition } from '../types/types';

interface Props {
  addPartition: (partition: Partition) => void;
  unit: 'MB' | 'KB' | 'GB';
}

const PartitionForm: FC<Props> = ({ addPartition, unit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const partition: Partition = {
      id: crypto.randomUUID(),
      size: Number((e.target as HTMLFormElement).partitionSize.value),
      process: null,
      available: Number((e.target as HTMLFormElement).partitionSize.value),
    };

    addPartition(partition);

    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Heading fontSize={'xl'}>Agregar nueva partición</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} flexDirection={'row'} mt={4} alignItems={'end'}>
          <FormControl id='partitionSize' isRequired flex={0.7}>
            <FormLabel>Tamaño de la partición ({unit})</FormLabel>
            <Input type='number' min={1} max={1000000} />
          </FormControl>
          <Button colorScheme='blue' type='submit' mt={4} w={'full'} flex={0.3}>
            Agregar
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default PartitionForm;
