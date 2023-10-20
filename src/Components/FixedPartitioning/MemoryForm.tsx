import { Button, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  handleCreateMemory: (mainMemory: number, soSize: number) => void;
}

export const MemoryForm: FC<Props> = ({ handleCreateMemory }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateMemory(
      Number((e.target as HTMLFormElement).mainMemory.value),
      Number((e.target as HTMLFormElement).so.value)
    );
  };

  return (
    <>
      <Heading fontSize={'xl'}>Crear configuración de memoria</Heading>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={4} flexDirection={'row'} mt={4}>
          <FormControl id='mainMemory' isRequired>
            <FormLabel>Memoria principal (KB)</FormLabel>
            <Input type='number' min={1} max={1000000} />
          </FormControl>
          <FormControl id='so' isRequired>
            <FormLabel>Sistema operativo (KB)</FormLabel>
            <Input type='number' min={1} max={1000000} />
          </FormControl>
        </Stack>
        <Button colorScheme='blue' type='submit' mt={4} w={'full'}>
          Crear
        </Button>
      </form>
    </>
  );
};
