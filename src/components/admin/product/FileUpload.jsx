import {
  FormControl,
  FormLabel,
  WrapItem,
  FormHelperText,
  Tag,
  GridItem,
  Input,
  InputGroup,
  Icon,
  CloseButton,
  Wrap,
  Avatar,
  AvatarBadge,
  VisuallyHidden,
  Spinner,
  useToast,
  useColorModeValue,
  useBoolean,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';

// functions
import { uploadImage } from '../../../lib/functions/cloudinary';

// helpers
import { toastError, toastSuccess } from '../../../lib/helpers/toastHandlers';

const resizeFile = file => {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      'JPEG',
      100,
      0,
      uri => resolve(uri),
      'base64'
    );
  });
};

const FileUpload = ({ onChange, values }) => {
  const [loading, setLoading] = useBoolean();
  const { token: authtoken } = useSelector(state => state.user);
  const toast = useToast();

  const styles = useColorModeValue(
    {
      bg: 'gray.100',
      psuedoBg: 'gray.200',
    },
    {
      bg: 'whiteAlpha.200',
      psuedoBg: 'whiteAlpha.300',
    }
  );

  async function fileUploadAndResize({ target: { files } }) {
    if (!files.length) return;
    setLoading.on();
    const images = [];
    try {
      for (let file of files) {
        const image = await resizeFile(file);
        const {
          data: { public_id, secure_url: url },
        } = await uploadImage({
          image,
          authtoken,
        });
        images.push({ public_id, url });
        onChange({
          value: values.images.concat(images),
          name: 'images',
        });
      }
      setLoading.off();
      toast(
        toastSuccess(
          'Uploaded Images',
          'Images have been uploaded to cloudinary'
        )
      );
    } catch (err) {
      if (err.status === 400) {
        console.log(err.message);
        setLoading.off();
        toast(toastError(err.message));
      }
    }
  }

  async function handleClick({ index }) {
    try {
      // const { public_id } = values.images[index];
      // await removeImage({ public_id, authtoken });
      // toast(
      //   toastSuccess('Image Removed.', `Image was removed from cloudinary`)
      // );
      const value = values.images
        .slice(0, index)
        .concat(values.images.slice(index + 1));
      onChange({ value, name: 'images' });
    } catch (err) {
      console.log(err.message);
      toast(toastError(err.message));
    }
  }

  return (
    <FormControl id="upload-image" as={GridItem} colSpan={2}>
      <FormLabel>Images</FormLabel>
      <FormLabel
        w="full"
        px={4}
        py={2}
        bg={styles.bg}
        fontWeight="bold"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        _focus={{ ring: '3px', ringColor: 'blue.700', bg: styles.psuedoBg }}
        _active={{ ring: '3px', ringColor: 'blue.700', bg: styles.psuedoBg }}
        _hover={{ bg: styles.psuedoBg }}
        position="relative"
      >
        {values.images.length > 0 && (
          <Tag fontWeight="black" position="absolute" left={4}>
            {values.images.length}
          </Tag>
        )}
        Upload Images
        {loading && <Spinner position="absolute" right={4} />}
        {!loading && (
          <Icon
            as={FontAwesomeIcon}
            icon={['fal', 'cloud-upload']}
            position="absolute"
            right={4}
          />
        )}
      </FormLabel>
      <VisuallyHidden>
        <InputGroup>
          <Input
            type="file"
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </InputGroup>
      </VisuallyHidden>
      <FormHelperText position="relative" minH={6}>
        <Wrap w="full" spacing={4} wrap="wrap" py={2}>
          {values.images.map(({ public_id, url }, index) => {
            return (
              <Avatar
                as={WrapItem}
                src={url}
                key={public_id}
                borderRadius="md"
                flex="auto"
                minW={20}
                minH={20}
                maxH={32}
                maxW={24}
                my={2}
              >
                <AvatarBadge border="none" bg="red.700">
                  <CloseButton
                    size="sm"
                    color="red.300"
                    onClick={() => handleClick({ index })}
                  />
                </AvatarBadge>
              </Avatar>
            );
          })}
        </Wrap>
      </FormHelperText>
    </FormControl>
  );
};

export default FileUpload;
