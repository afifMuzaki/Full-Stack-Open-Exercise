import { useSelector } from "react-redux";

const FlashMessage = () => {
  const message = useSelector((state) => state.message);

  if (!message) return null;

  return <div className={`message ${message.type}`}>{message.text}</div>;
};

export default FlashMessage;
