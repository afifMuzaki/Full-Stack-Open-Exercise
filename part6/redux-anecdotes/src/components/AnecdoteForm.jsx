import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = async (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = "";
        dispatch(createAnecdote(content));
        dispatch(setNotification(`you added '${content}'`, 5));
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