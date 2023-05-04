import styles from './Tile.module.css';
import PostImage from '../PostImage/PostImage';
import Details from '../Details/Details';
import Link from 'next/link';
import React from 'react';

const Tile = ({ className, post }) => (
  <Link className={className} as={`/${post.category}/${post.slug}`} href="/[category]/[slug]">
    <article className={styles.tile}>
      <PostImage alt={post.title} className={styles.image} image={post.featured_image} ratio={false} sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, (max-width: 1300px) 33vw, 400px" srcset={[320, 412, 824]} />
      <Details className={styles.details} post={post} />
    </article>
  </Link>
);

export default Tile;