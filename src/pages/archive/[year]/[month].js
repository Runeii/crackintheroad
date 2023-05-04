import Archive from '../../../components/Archive/Archive';

const Index = Archive;

export async function getStaticProps({ params: { month: rawMonth, year } }) {
  const years = require(`../../../../public/api/dates/years.json`).map(year => year.toString());

  const month = rawMonth.charAt(0) === '0' ? rawMonth.slice(1) : rawMonth;
  const start = new Date();
  start.setFullYear(year, month - 1, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setFullYear(year, month, 1);
  end.setHours(0, 0, 0, 0);

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
  const months = [...new Array(12)].map((_, i) => (i + 1).toString());
  const zeroedMonths = [...new Array(9)].map((_, i) => `0${(i + 1)}`);

  const paths = years.flatMap(year => {
    return [...zeroedMonths, ...months].map(month => {
      return {
        params: {
          month,
          year,
        }
      }
    })
  })

  return {
    paths,
    fallback: false
  };
}

export default Index;