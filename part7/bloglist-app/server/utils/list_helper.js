const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    if (blogs.length === 1) return blogs[0].likes;

    return blogs
        .map(blog => blog.likes)
        .reduce((prev, curr) => prev + curr);
};

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max.apply(Math, blogs.map(blog => blog.likes));
    const favorite = blogs.find(blog => blog.likes === mostLikes);
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };
};

const mostBlogs = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author');
    const mostFrequentAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author]);
    const maxCount = authorCounts[mostFrequentAuthor];
    return {
        author: mostFrequentAuthor,
        blogs: maxCount
    };
}

const mostLikes = (blogs) => {
    const groupedByAuthor = _.groupBy(blogs, 'author');
    const authorLikes = _.mapValues(groupedByAuthor, items => _.sumBy(items, 'likes'));
    const authorWithMostLikes = _.maxBy(Object.keys(authorLikes), author => authorLikes[author]);
    return {
        author: authorWithMostLikes,
        likes: authorLikes[authorWithMostLikes]
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};