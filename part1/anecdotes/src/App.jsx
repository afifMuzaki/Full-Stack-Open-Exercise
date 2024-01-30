import { useState } from 'react';
import Button from './Button';
import Anecdotes from './Anecdotes';
import MostVotes from './MostVotes';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length));
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const votedAnecdotes = [...voted];
    votedAnecdotes[selected] += 1;
    setVoted(votedAnecdotes);
    findMostVotes(votedAnecdotes);
  };

  const findMostVotes = (voted) => {
    const mostVotesIndex = voted.indexOf(Math.max(...voted));
    setMostVotes(mostVotesIndex)
  };

  return (
    <div>
      <Anecdotes anecdotes={anecdotes[selected]} votes={voted[selected]} />
      <Button text='vote' handle={handleVote} />
      <Button text='next anecdote' handle={handleRandom} />
      <MostVotes anecdote={anecdotes[mostVotes]} votes={voted[mostVotes]}/>
    </div>
  )
}

export default App
