import Archive from '../../../components/Archive/Archive';

const Index = Archive;

export async function getStaticProps({ params: { year } }) {
  const years = require(`../../../../public/api/dates/years.json`).map(year => year.toString());

  const start = new Date();
  start.setFullYear(year, 0, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setFullYear(year, 11, 31);
  end.setHours(23, 59, 59, 999);

  const startTime = start.getTime();
  const endTime = end.getTime();


  const posts = require(`../../../../public/api/posts/index.json`);
  const filtered = posts.filter(post => post.date > startTime && post.date < endTime);
  const fullPosts = filtered.map(post => require(`../../../../public/api/posts/${post.slug}.json`));

  return {
    props: {
      posts: fullPosts,
      year,
      years
    },
  }
}

export async function getStaticPaths() {
  const years = require(`../../../../public/api/dates/years.json`).map(year => year.toString());

  const paths = years.map(year => {
    return {
      params: {
        year,
      }
    }
  })
  return {
    paths,
    fallback: false
  };
}

export default Index;