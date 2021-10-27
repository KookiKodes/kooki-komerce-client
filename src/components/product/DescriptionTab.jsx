import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  SlideFade,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

const selected = ({ bg, color, border }) => {
  return {
    bg,
    border: '2px',
    borderColor: border,
    borderBottomColor: bg,
    color,
  };
};

const DescriptionTab = ({ description }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { bg, color, border } = useColorModeValue(
    { bg: 'gray.200', color: 'yellow.600', border: 'gray.300' },
    { bg: 'gray.700', color: 'yellow.500', border: 'whiteAlpha.200' }
  );

  function handleTabChange(index) {
    setTabIndex(index);
  }

  return (
    <Tabs
      index={tabIndex}
      onChange={handleTabChange}
      variant="enclosed"
      colorScheme="yellow"
      w="full"
    >
      <TabList border="none" w="full">
        <Tab _selected={selected({ bg, color, border })}>Description</Tab>
        <Tab _selected={selected({ bg, color, border })}>More</Tab>
      </TabList>
      <TabPanels
        bg={bg}
        border="2px"
        borderColor={border}
        roundedRight="md"
        w="full"
      >
        <TabPanel fontSize="lg" position="relative" overflow="hidden">
          <SlideFade
            offsetY={50}
            in={tabIndex === 0}
            style={{ position: 'relative' }}
          >
            <Text>{description}</Text>
          </SlideFade>
        </TabPanel>
        <TabPanel fontSize="lg" overflow="hidden">
          <SlideFade in={tabIndex === 1} style={{ position: 'relative' }}>
            <Text>
              Call us on xxx xxx xxxx to learn more about this product.
            </Text>
          </SlideFade>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DescriptionTab;
