import { Button, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { randomColor } from '../consts/consts';
import { Process } from '../types/types';

interface Props {
  handleAddProcess: (process: Process) => void;
  unit: 'MB' | 'KB' | 'GB';
}

const ProcessForm: FC<Props> = ({ handleAddProcess, unit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const process: Process = {
      name: (e.target as HTMLFormElement).processName.value,
      size: Number((e.target as HTMLFormElement).processSize.value),
      id: crypto.randomUUID(),
      color: randomColor(),
    };

    (e.target as HTMLFormElement).reset();

    handleAddProcess(process);
  };

  return (
    <>
      <Heading fontSize={'xl'}>Agregar nuevo proceso</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} flexDirection={'row'} mt={4} alignItems={'end'}>
          <FormControl id='processName' isRequired flex={0.35}>
            <FormLabel>Nombre del proceso</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl id='processSize' isRequired flex={0.35}>
            <FormLabel>Tamaño del proceso ({unit})</FormLabel>
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

export default ProcessForm;
