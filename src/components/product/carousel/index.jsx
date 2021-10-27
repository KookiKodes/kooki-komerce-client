// packages
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// images
import PlaceholderImg from '../images/laptop.png';

function Carousel({ height, images, title }) {
  if (!height) return null;

  if (!images.length) {
    return (
      <ReactCarousel autoPlay showThumbs={false} infiniteLoop>
        <img src={PlaceholderImg} alt="placeholder" />
      </ReactCarousel>
    );
  }
  return (
    <ReactCarousel
      autoPlay
      showThumbs={true}
      renderThumbs={() => {
        return images.map(({ url }, index) => (
          <img src={url} alt={`thumbnail of ${title}`} key={index} />
        ));
      }}
      infiniteLoop
    >
      {images.map(({ url, public_id }) => {
        return (
          <img
            src={url}
            alt={title}
            key={public_id}
            style={{
              height: height - 100,
              width: height - 100,
            }}
          />
        );
      })}
    </ReactCarousel>
  );
}

export default Carousel;
