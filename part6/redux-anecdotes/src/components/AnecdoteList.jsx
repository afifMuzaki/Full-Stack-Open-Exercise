import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes
        .filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter)));

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
    };

    return (
        <>
            {anecdotes.sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    );
};

export default AnecdoteList;