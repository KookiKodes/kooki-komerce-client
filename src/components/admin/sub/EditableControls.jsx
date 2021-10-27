import {
  useEditableControls,
  ScaleFade,
  Tooltip,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return (
    <>
      <ScaleFade w="full" in={isEditing} initialScale={0.4}>
        {isEditing && (
          <>
            <Tooltip label="Cancel" aria-label="Cancel">
              <IconButton
                colorScheme="red"
                variant="ghost"
                icon={<Icon as={FontAwesomeIcon} icon={['fal', 'times']} />}
                mr={2}
                {...getCancelButtonProps()}
              />
            </Tooltip>
            <Tooltip label="Save" aria-label="Save">
              <IconButton
                colorScheme="green"
                variant="ghost"
                icon={<Icon as={FontAwesomeIcon} icon={['fal', 'check']} />}
                {...getSubmitButtonProps()}
              />
            </Tooltip>
          </>
        )}
      </ScaleFade>
      <ScaleFade in={!isEditing} initialScale={0.4}>
        {!isEditing && (
          <Tooltip label="Edit Name" aria-label="Edit Name">
            <IconButton
              variant="ghost"
              colorScheme="yellow"
              icon={<Icon as={FontAwesomeIcon} icon={['fal', 'pencil']} />}
              {...getEditButtonProps()}
            />
          </Tooltip>
        )}
      </ScaleFade>
    </>
  );
};
export default EditableControls;
