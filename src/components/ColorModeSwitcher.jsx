import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Button, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sun = () => <Icon as={FontAwesomeIcon} icon={['fal', 'sun']} mx={2} />;
const Moon = () => <Icon as={FontAwesomeIcon} icon={['fal', 'moon']} mx={2} />;

export const ColorModeSwitcher = props => {
  const { toggleColorMode, colorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(Sun, Moon);

  return (
    <Button
      size="md"
      fontWeight="light"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      rightIcon={<SwitchIcon />}
      {...props}
    >
      Dark Theme: {colorMode === 'light' ? 'Off' : 'On'}
    </Button>
  );
};
