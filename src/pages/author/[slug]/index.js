import Archive from '../../../components/Archive/Archive';

const Index = Archive;

export async function getStaticProps({ params: { slug } }) {
  const allPosts = require('../../../../public/api/posts/index.json');

  const posts = allPosts.filter(post => post.author === slug);
  const fullPosts = posts.map(post => require(`../../../../public/api/posts/${post.slug}.json`));

  return {
    props: {
      posts: fullPosts
    },
  }
}

export async function getStaticPaths() {
  const authors = require(`../../../../public/api/authors.json`)
  const paths = authors.map(author => {
    return {
      params: {
        slug: author.slug,
      }
    }
  })

  return {
    paths,
    fallback: false
  };
}

export default Index;