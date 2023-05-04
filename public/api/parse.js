const fs = require('fs');

const authors = require('./authors.json');
const posts = fs.readdirSync('./posts').map(file => {
  const f = fs.readFileSync('./posts/' + file);
  const post = JSON.parse(f);


  if (!post.id) {
    return null
  }

  return {
    id: post.id,
    slug: post.slug,
    categories: post.categories,
    category: post.category,
    author: authors.find(author => author.id === post.author).slug,
    date: post.date,
    hasImage: !!post.featured_image,
  }
}).filter(post => post !== null).sort((a, b) => a.date < b.date ? 1 : -1);

fs.writeFileSync('./posts/index.json', JSON.stringify(posts));