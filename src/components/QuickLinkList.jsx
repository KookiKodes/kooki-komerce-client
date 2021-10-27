// packages
import { Wrap, WrapItem, Badge, Tooltip } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const QuickLinkList = ({ prefix, links = [] }) => {
  const location = useLocation();
  if (!links.length > 0) return null;
  return (
    <Wrap h="min-content" w="full" py={5} my={0} justify="center" spacing={4}>
      {links.map(({ name, slug }) => {
        return (
          <Tooltip
            label={`Click to visit ${name}`}
            aria-label={`Click to visit ${name}`}
            key={name}
          >
            <WrapItem>
              <Badge
                as={Link}
                alignItems="center"
                justifyContent="center"
                display="flex"
                to={`/${prefix}/${slug}`}
                colorScheme="blue"
                fontSize="2xl"
                px={2}
                borderBottom="2px"
                borderColor="transparent"
                transition="border-color .2s ease, color .2s ease"
                _hover={{ borderColor: 'yellow.500', color: 'yellow.500' }}
                state={location}
              >
                {name}
              </Badge>
            </WrapItem>
          </Tooltip>
        );
      })}
    </Wrap>
  );
};

export default QuickLinkList;
