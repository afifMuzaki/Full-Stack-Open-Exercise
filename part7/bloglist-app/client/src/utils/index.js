export const showMessage = (message, duration, dispatch) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: message,
  });

  setTimeout(() => {
    dispatch({
      type: "REMOVE_MESSAGE",
    });
  }, duration * 1000);
};

export const findAndUpdateBlog = (blogs, updatedBlog) =>
  blogs.map((blog) => {
    if (blog.id === updatedBlog.id) {
      return { ...blog, likes: updatedBlog.likes };
    }
    return blog;
  });

export const findAndAddComment = (blogs, comment) =>
  blogs.map((blog) => {
    if (blog.id === comment.blog) {
      return { ...blog, comments: blog.comments.concat(comment) };
    }
    return blog;
  });
