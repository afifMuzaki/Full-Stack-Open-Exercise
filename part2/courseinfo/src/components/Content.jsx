import Part from "./Part";
import Total from './Total';

const Content = ({ parts, title, courseSum }) => {
  return (
    <>
      <h2>{title}</h2>
      {parts.map(part =>
        <Part part={part} key={part.id} />
      )}
      <Total sum={courseSum} />
    </>
  );
};

export default Content;