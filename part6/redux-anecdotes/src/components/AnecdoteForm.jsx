import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = "";
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(createAnecdote(newAnecdote));
        dispatch(setNotification(`you added '${content}'`));

        setTimeout(() => {
            dispatch(removeNotification(""));
        }, 5000);
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;