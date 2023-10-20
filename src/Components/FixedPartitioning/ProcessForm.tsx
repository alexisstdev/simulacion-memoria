import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Process } from '../../types/types';
import { randomColor } from '../../consts/consts';

interface Props {
  handleAddProcess: (process: Process) => void;
}

const ProcessForm: FC<Props> = ({ handleAddProcess }) => {
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
    <form onSubmit={handleSubmit}>
      <Stack spacing={4} flexDirection={'row'}>
        <FormControl id='processName' isRequired>
          <FormLabel>Nombre del proceso</FormLabel>
          <Input type='text' />
        </FormControl>
        <FormControl id='processSize' isRequired>
          <FormLabel>Tamaño del proceso (KB)</FormLabel>
          <Input type='number' min={1} max={1000000} />
        </FormControl>
      </Stack>
      <Button colorScheme='blue' type='submit' mt={4} w={'full'}>
        Agregar
      </Button>
    </form>
  );
};

export default ProcessForm;
