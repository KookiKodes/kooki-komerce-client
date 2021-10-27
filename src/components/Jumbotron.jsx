import { Center, Heading, useColorModeValue } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';

const Jumbotron = ({ children, typewriter = true }) => {
  const styles = useColorModeValue(
    { bg: 'gray.200, gray.300', color: 'blue.700' },
    { bg: 'whiteAlpha.200, whiteAlpha.50', color: 'yellow.400' }
  );
  return (
    <Center
      w="full"
      bgGradient={`linear(to-br, ${styles.bg})`}
      h="25vh"
      minH="320px"
      shadow="md"
      px={10}
      color={styles.color}
    >
      <Heading
        size="2xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {typewriter && (
          <Typewriter
            options={{
              strings: children,
              autoStart: true,
              loop: true,
            }}
          />
        )}
        {!typewriter && children}
      </Heading>
    </Center>
  );
};

export default Jumbotron;
