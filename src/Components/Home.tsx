import { Box, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Link to={'/'}>
        <Heading>Sistemas operativos</Heading>
      </Link>
      <Text mt={2} opacity={0.75}>
        Alexis Sanmiguel Torres - 21100288
      </Text>
      <Divider my={6} />
      <Flex justifyContent={'space-between'} gap={4}>
        <Link to={'estatica'}>
          <Box
            w={'full'}
            boxShadow={'2xl'}
            rounded={'xl'}
            overflow={'hidden'}
            bg='#1d2738'
            _hover={{
              bg: '#30415e',
              transition: 'all .2s ease-in-out',
            }}
          >
            <Box px={4} py={4}>
              <Stack>
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                  Memoria estática
                </Heading>
                <Text color={'gray.500'}>Aplicación que simula la memoria estática</Text>
              </Stack>
            </Box>
          </Box>
        </Link>
        <Link to={'dinamica'}>
          <Box
            w={'full'}
            boxShadow={'2xl'}
            rounded={'xl'}
            overflow={'hidden'}
            bg='#1d2738'
            _hover={{
              bg: '#30415e',
              transition: 'all .2s ease-in-out',
            }}
          >
            <Box px={4} py={4}>
              <Stack>
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                  Memoria dinámica
                </Heading>
                <Text color={'gray.500'}>Aplicación que simula la memoria dinámica</Text>
              </Stack>
            </Box>
          </Box>
        </Link>
      </Flex>
    </>
  );
};

export default Home;
