import Image from 'next/image';
import styles from './PostImage.module.css';
import React, { useRef } from 'react';


const PostImage = ({ alt, className, image, isLazy, sizes, srcset }) => {
  const imageRef = useRef();

  if (typeof image === 'string' || !image) {
    return null;
  }
  return (
    <div className={`${styles.image} ${className}`} ref={imageRef}>
      <Image
        alt={alt}
        className={styles.img}
        height={image.height}
        sizes={sizes}
        placeholder={image.placeholder ? "blur" : "empty"}
        blurDataURL={image.placeholder}
        src={`/api/uploads/${image.src}`}
        width={image.width}
      />
    </div>
  );
}

PostImage.defaultProps = {
  className: '',
  isLazy: true,
  ratio: 66,
};

export default PostImage;