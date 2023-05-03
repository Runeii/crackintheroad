import styles from './PostImage.module.css';
import React, { useRef } from 'react';

const imageAsBase64 = url => {
  if (typeof window === 'undefined') {
    const fs = require('fs');
    try {
      const bitmap = fs.readFileSync(`public${url}`);
      return 'data:image/jpeg;base64, ' + bitmap.toString('base64');
    } catch (error) {
      return '';
    }
  } else {
    return url;
  }
};

const PostImage = ({ alt, className, image, isLazy, sizes, srcset }) => {
  const imageRef = useRef();
  const image_url = `https://api.crackintheroad.com/images/${image}`;
  const thumbnail_url = imageAsBase64(`/thumbnails/${image}`);
  const format = (typeof window === 'undefined' || window.isWebPSupported !== true) ? '' : 'type=webp'

  if (!image_url) {
    return null;
  }

  return (
    <div className={`${styles.image} ${className}`} ref={imageRef}>
      <img alt={alt} className={styles.placeholder} src={thumbnail_url} />
      <picture>
        <source
          sizes={sizes}
          srcSet={srcset.map(size =>
            image_url + `?width=${size}type=webp ${size}w`
          ).join(', ')}
          src={image_url}
        ></source>
        <source
          sizes={sizes}
          srcSet={srcset.map(size =>
            image_url + `?width=${size} ${size}w`
          ).join(', ')}
          src={image_url}
        ></source>
        <img
          alt={alt}
          src={image_url}
        />
      </picture>
    </div>
  );
}

PostImage.defaultProps = {
  className: '',
  isLazy: true,
  ratio: 66,
};

export default PostImage;