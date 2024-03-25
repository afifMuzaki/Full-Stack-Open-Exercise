import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (err) => {
      notificationDispatch({ type: "SHOW_NOTIFICATION", payload: err.response.data.error });

      setTimeout(() => {
        notificationDispatch({ type: "REMOVE_NOTIFICATION" });
      }, 5000);
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = '';
    console.log('new anecdote');
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notificationDispatch({ type: "SHOW_NOTIFICATION", payload: `anecdote '${content}' added` });

    setTimeout(() => {
      notificationDispatch({ type: "REMOVE_NOTIFICATION" });
    }, 5000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
