import {
  Alert,
  AlertIcon,
  Text,
  AlertTitle,
  AlertDescription,
  Stack,
  HStack,
  Icon,
  Link as CLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error404 = () => {
  return (
    <HStack w="full" h="full" p={20} fontSize="xl">
      <Alert status="error" variant="solid" p={4}>
        <AlertIcon
          size="lg"
          as={FontAwesomeIcon}
          icon={['fal', 'exclamation-circle']}
        />
        <Stack flex="auto" flexDir="column">
          <AlertTitle>Error 404</AlertTitle>
          <AlertDescription>
            The page you are trying to visit does not exist!
          </AlertDescription>
          <CLink as={Link} to={-1}>
            <HStack>
              <Text fontWeight="bold">Go Back</Text>
              <Icon as={FontAwesomeIcon} icon={['fal', 'long-arrow-right']} />
            </HStack>
          </CLink>
        </Stack>
      </Alert>
    </HStack>
  );
};

export default Error404;
