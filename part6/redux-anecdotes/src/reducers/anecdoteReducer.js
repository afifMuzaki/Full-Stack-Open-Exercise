import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const { id } = action.payload;
      return state.map(anecdote => (anecdote.id === id) ?  action.payload : anecdote);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    }
  },
});

export const initializeAnecdote = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll();
    dispatch(setAnecdotes(response));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote);
    dispatch(updateAnecdote(votedAnecdote));
  };
};

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;