import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  handleCreateMemory: (mainMemory: number, soSize: number, unit: string) => void;
}

export const MemoryForm: FC<Props> = ({ handleCreateMemory }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateMemory(
      Number((e.target as HTMLFormElement).mainMemory.value),
      Number((e.target as HTMLFormElement).so.value),
      (e.target as HTMLFormElement).unit.value
    );
  };

  return (
    <>
      <Divider my={6} />
      <Heading fontSize={'xl'}>Crear configuración de memoria</Heading>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={4} flexDirection={'row'} mt={4}>
          <FormControl id='mainMemory' isRequired flex={0.45}>
            <FormLabel>Memoria principal</FormLabel>
            <Input type='number' min={1} max={1000000} />
          </FormControl>
          <FormControl id='so' isRequired flex={0.45}>
            <FormLabel>Sistema operativo</FormLabel>
            <Input type='number' min={1} max={1000000} />
          </FormControl>
          <FormControl id='unit' isRequired flex={0.1}>
            <FormLabel>Unidad</FormLabel>
            <Select placeholder='--' color='black' bg='white'>
              <option value='MB'>MB</option>
              <option value='KB'>KB</option>
              <option value='GB'>GB</option>
            </Select>
          </FormControl>
        </Stack>
        <Button colorScheme='blue' type='submit' mt={4} w={'full'}>
          Crear
        </Button>
      </form>
    </>
  );
};
