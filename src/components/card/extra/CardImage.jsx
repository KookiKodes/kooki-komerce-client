import { Image } from '@chakra-ui/react';
import laptop from '../images/laptop.png';

const CardImage = ({ src, alt }) => {
  return (
    <Image
      src={src}
      fit="cover"
      fallbackSrc={laptop}
      alt={alt}
      maxH={200}
      w="20rem"
      _groupHover={{ shadow: 'md' }}
    />
  );
};

export default CardImage;
