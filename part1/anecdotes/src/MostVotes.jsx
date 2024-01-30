const MostVotes = ({anecdote, votes}) => {
    if (!anecdote || !votes) {
        return (
            <>
                <h1>Anecdote with most votes</h1>
                <p>No anecdotes with the most votes yet.</p>
            </>
        );
    }

    return (
        <>
            <h1>Anecdote with most votes</h1>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </>
    );
};

export default MostVotes;