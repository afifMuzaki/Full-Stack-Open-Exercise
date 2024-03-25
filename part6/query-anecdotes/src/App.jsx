import { getAnecdotes, voteAnecdote } from './requests';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotificationDispatch } from "./contexts/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  });

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"],
        anecdotes.map(anecdote => (anecdote.id !== votedAnecdote.id) ? anecdote : votedAnecdote));
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: (anecdote.votes + 1) });
    notificationDispatch({ type: "SHOW_NOTIFICATION", payload: `anecdote '${anecdote.content}' voted` });

    setTimeout(() => {
      notificationDispatch({ type: "REMOVE_NOTIFICATION" });
    }, 5000);
  }

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
