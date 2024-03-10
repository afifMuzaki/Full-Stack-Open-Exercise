const BlogForm = ({
    handleCreate,
    setTitle,
    title,
    setAuthor,
    author,
    setUrl,
    url,
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    title
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default BlogForm;