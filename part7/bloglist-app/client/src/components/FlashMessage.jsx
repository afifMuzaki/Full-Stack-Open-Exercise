import { useContext } from "react";
import { IndexContext } from "../context/IndexContext";

const FlashMessage = () => {
  const { message } = useContext(IndexContext);

  if (!message.value) return null;

  return (
    <div className={`message ${message.value.type}`}>{message.value.text}</div>
  );
};

export default FlashMessage;
