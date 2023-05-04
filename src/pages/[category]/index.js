import Archive from '../../components/Archive/Archive';

const Index = Archive;

export async function getStaticProps({ params }) {
  const allPosts = require('../../../public/api/posts/index.json');
  const posts = allPosts.filter(post => post.categories.includes(params.category));
  const fullPosts = posts.map(post => require(`../../../public/api/posts/${post.slug}.json`));

  return {
    props: {
      posts: fullPosts
    },
  }
}

export async function getStaticPaths() {
  const categories = require('../../../public/api/categories.json');

  const paths = categories.map(({ slug }) => {
    return {
      params: {
        category: slug,
      }
    }
  })

  return {
    paths,
    fallback: false
  };
}

export default Index;