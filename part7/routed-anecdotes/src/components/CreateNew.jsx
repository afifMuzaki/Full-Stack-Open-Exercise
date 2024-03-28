import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
    const { resetValue: resetContent, ...content } = useField("text");
    const { resetValue: resetAuthor, ...author } = useField("text");
    const { resetValue: resetInfo, ...info } = useField("text");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
        navigate("/");
    };

    const handleReset = () => {
        resetContent();
        resetAuthor();
        resetInfo();
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...content} />
                </div>
                <div>
                    author
                    <input name='author' {...author} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...info} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={handleReset}>reset</button>
            </form>
        </div>
    );
};

export default CreateNew;