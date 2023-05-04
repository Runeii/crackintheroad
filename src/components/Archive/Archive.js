import styles from './Archive.module.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import useIntersectionObserver from './useIntersectionObserver';

const PAGE_SIZE = 35;
const Archive = ({ children, posts }) => {
  const [page, setPage] = useState(1);

  const visiblePosts = useMemo(() => posts.slice(0, PAGE_SIZE * page), [page, posts]);

  const bottomRef = useRef();
  const entry = useIntersectionObserver(bottomRef);
  const isCompleted = page * PAGE_SIZE >= posts.length;

  useEffect(() => {
    setPage(1);
  }, [posts]);

  useEffect(() => {
    if (isCompleted) {
      return;
    }
    if (entry?.isIntersecting) {
      setPage(page + 1);
    }
  }, [entry, isCompleted, page]);

  return (
    <main className={styles.page}>
      {children}
      <div className={styles.posts}>
        {visiblePosts.map(post => <Tile className={styles.tile} key={post.id} post={post}></Tile>)}
        {!isCompleted && <div className={styles.paginator} ref={bottomRef} />}
      </div>
    </main>
  );
};

export default Archive;