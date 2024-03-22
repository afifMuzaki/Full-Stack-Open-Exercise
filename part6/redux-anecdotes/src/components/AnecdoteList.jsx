import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes
        .filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter)));

    const dispatch = useDispatch();

    const vote = (id, content) => {
        dispatch(voteAnecdote(id));
        dispatch(setNotification(`you voted '${content}'`));

        setTimeout(() => {
            dispatch(removeNotification(""));
        }, 5000);
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
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    );
};

export default AnecdoteList;