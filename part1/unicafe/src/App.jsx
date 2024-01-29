import { useState } from 'react'
import Title from './Title';
import Button from './Button';
import Statistics from './Statistics';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const countAverage = ({ good, neutral, bad, total }) => setAverage(((good * 1) + (neutral * 0) + (bad * (-1))) / total);

  const countPositive = ({ good, total }) => setPositive((good / total) * 100);

  const handleClickGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    countAverage({ good: (good + 1), neutral, bad, total: (all + 1) });
    countPositive({ good: (good + 1), total: (all + 1) });
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    countAverage({ good, neutral: (neutral + 1), bad, total: (all + 1) });
    countPositive({ good, total: (all + 1) });
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    countAverage({ good, neutral, bad: (bad + 1), total: (all + 1) });
    countPositive({ good, total: (all + 1) });
  };

  return (
    <div>
      <Title title='give feedback' />

      <Button handler={handleClickGood} text='good' />
      <Button handler={handleClickNeutral} text='neutral' />
      <Button handler={handleClickBad} text='bad' />

      <Statistics datas={
        { info: [good, neutral, bad], total: all, average: average, positive: positive }
      } />
    </div>
  )
}

export default App
