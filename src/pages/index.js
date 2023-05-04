import React from 'react';
import Archive from '../components/Archive/Archive';

const Index = ({ posts }) => (
  <Archive posts={posts} />
);

export async function getStaticProps() {
  const json = require('../../public/api/posts/index.json')

  const index = json.filter(post => post.hasImage).sort(() => 0.5 - Math.random()).slice(0, 40);
  const posts = index.map(post => require(`../../public/api/posts/${post.slug}.json`));

  return {
    props: {
      posts,
    },
  }
}

export default Index;