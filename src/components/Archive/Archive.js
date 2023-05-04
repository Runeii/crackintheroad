import styles from './Archive.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import Tile from '../Tile/Tile';

const PAGE_SIZE = 35;
const Archive = ({ children, posts }) => {
  const [completed, setCompleted] = useState(false);
  const [page, setPage] = useState(1);

  const visiblePosts = useMemo(() => posts.slice(0, PAGE_SIZE * page), [page, posts]);

  useEffect(() => {
    setCompleted(false);
    setPage(1);
  }, [posts]);

  return (
    <main className={styles.page}>
      {children}
      <div className={styles.posts}>
        {visiblePosts.map(post => <Tile className={styles.tile} key={post.id} post={post}></Tile>)}
        {!completed && <button className={styles.next}>Previous</button>}
      </div>
    </main>
  );
};

export default Archive;