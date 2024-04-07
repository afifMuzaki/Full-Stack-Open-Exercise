import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/authReducer";

const Navigation = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  if (!loggedUser) return null;

  return (
    <nav style={{ backgroundColor: "lightgrey" }}>
      <Link to={"/blogs"}>blogs </Link>
      <Link to={"/users"}>users </Link>
      <span>{loggedUser.name} logged in </span>
      <span>
        <button onClick={handleLogout}>logout</button>
      </span>
    </nav>
  );
};

export default Navigation;
