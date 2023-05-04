import styles from './Details.module.css';
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const formatTitle = title => {
  const hyphenSplit = title.split(' – ');

  if (hyphenSplit.length === 2) {
    const [artist, track] = hyphenSplit;
    const cleanArtist = artist
      .replace(/^(New: )/i, '')
      .replace(/^(Single of the Week: )/i, '')
      .replace(/^(Review: )/i, '')
      .replace(/^(Stream: )/i, '')
      .replace(/^(Video: )/i, '')
      .replace(/^(News: )/i, '')
      .replace(/^(MPFree: )/i, '');
    return { artist: cleanArtist, track };
  }
  return title;
};

const Details = ({ className, hasAuthor, heading, post }) => {
  const HTag = heading;
  const { artist, track, title } = formatTitle(post.title);
  const date = format(post.date, 'do MMM yyy');

  return (
    <div className={`${styles.frame} ${className}`}>
      <HTag className={styles.title}>
        {!artist && !track && post.title}
        {artist && <span className={styles.artist}>{artist}</span>}
        {track && <span className={styles.track}>{track}</span>}
      </HTag>
      {hasAuthor && post.author && (
        <div className={styles.details}>
          <p className={styles.date}>{date}</p>
        </div>
      )}
    </div>
  );
}

Details.defaultProps = {
  className: null,
  hasAuthor: true,
  heading: 'h4',
};

export default Details;