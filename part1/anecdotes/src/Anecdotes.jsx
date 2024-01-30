const Anecdotes = ({anecdotes, votes}) => {
    return (
        <>
            <h1>Anecdotes of the day</h1>
            <p>{anecdotes}</p>
            <p>has {votes} votes</p>
        </>
    );
};

export default Anecdotes;