import styles from './Single.module.css';
import Featured from '../../components/Featured/Featured';
import Head from 'next/head';
import React from 'react';

const Single = ({ post }) => {
  const {
    category,
    content,
    slug,
    featured_image,
    title,
  } = post;

  const description = content.length > 160 ? content.substring(0, content - 3) + "..." : content;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title key="title">{title}</title>
        <meta key="ogtitle" name="og:title" property="og:title" content={title} />
        <meta key="ogdescription" name="og:description" property="og:description" content={description} />
        <meta key="ogsite_name" property="og:site_name" content={title} />
        <meta key="ogurl" property="og:url" content={`https://www.crackintheroad.com/${category}/${slug}`} />
        <meta key="ogimage" property="og:image" content={`https://www.crackintheroad.com/api/uploads/${featured_image?.src}`} />
        <meta key="ogimagetype" property="og:image:type" content="image/jpeg" />
        <meta key="ogimagewidth" property="og:image:width" content="1200" />
        <meta key="ogimageheight" property="og:image:height" content="630" />
        <meta key="ogimagealt" property="og:image:alt" content={title} />
        <meta key="twittercard" name="twitter:card" content="summary_large_image" />
        <meta key="twittertitle" name="twitter:title" content={title} />
        <meta key="twitterdescription" name="twitter:description" content={description} />
      </Head>
      <div className={styles.page}>
        <Featured className={styles.header} hasAuthor post={post} tag="header" />
        <div className={`${styles.content} post-content`} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const post = require(`../../../public/api/posts/${slug}.json`);

  return {
    props: {
      post,
    }
  }
}

export async function getStaticPaths() {
  const posts = require('../../../public/api/posts/index.json');

  const filter = posts.filter(post => !post.category)

  const paths = posts.map(({ category, categories, slug }) => {
    return {
      params: {
        category: category || categories?.[0],
        slug
      }
    }
  })

  return {
    paths,
    fallback: false
  };
}


export default Single;