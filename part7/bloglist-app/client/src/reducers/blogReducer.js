import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setMessage } from "./messageReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    blogInit: (state, action) => {
      return action.payload;
    },

    addBlog: (state, action) => {
      return state.concat(action.payload);
    },

    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },

    updateBlog: (state, action) => {
      return state.map((blog) => {
        if (blog.id === action.payload.id)
          return { ...blog, likes: action.payload.likes };

        return blog;
      });
    },
  },
});

export const getBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(blogInit(response));
  };
};

export const createBlog = (blogData) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blogData);
      dispatch(addBlog(createdBlog));

      dispatch(
        setMessage(
          {
            type: "success",
            text: `a new blog ${blogData.title} by ${blogData.author} added`,
          },
          5,
        ),
      );
    } catch (err) {
      dispatch(setMessage({ type: "error", text: err.response.data.error }, 5));
    }
  };
};

export const deleteBlog = (blogId, title, author) => {
  return async (dispatch) => {
    try {
      await blogService.destroy(blogId);
      dispatch(removeBlog(blogId));

      dispatch(
        setMessage(
          { type: "success", text: `${title} by ${author} deleted` },
          5,
        ),
      );
    } catch (err) {
      dispatch(setMessage({ type: "error", text: err.response.data.error }, 5));
    }
  };
};

export const likeBlog = (newBlog, blogId) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(newBlog, blogId);
      dispatch(updateBlog(updatedBlog));

      dispatch(
        setMessage(
          {
            type: "success",
            text: `${newBlog.title} by ${newBlog.author} liked`,
          },
          5,
        ),
      );
    } catch (err) {
      dispatch(setMessage({ type: "error", text: err.response.data.error }, 5));
    }
  };
};

export const { blogInit, addBlog, removeBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
