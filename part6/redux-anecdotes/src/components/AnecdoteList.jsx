import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes
        .filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter)));

    const dispatch = useDispatch();

    const vote = (id) => {
        console.log('vote', id);
        dispatch(voteAnecdote(id));
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
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    );
};

export default AnecdoteList;