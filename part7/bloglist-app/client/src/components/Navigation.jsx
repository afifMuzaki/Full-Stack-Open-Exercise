import { Link } from "react-router-dom";
// import { userLogout } from "../reducers/authReducer";
import { IndexContext } from "../context/IndexContext";
import { useContext } from "react";

const Navigation = () => {
  const { authUser } = useContext(IndexContext);

  const handleLogout = () => {
    // dispatch(userLogout());
  };

  if (!authUser.loggedUser) return null;

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to={"/"} className="navbar-item has-text-weight-semibold">
          Blog App
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to={"/blogs"} className="navbar-item">
            Blogs
          </Link>
          <Link to={"/users"} className="navbar-item">
            Users
          </Link>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item has-dropdown is-hoverable is-right">
          <a className="navbar-link">{authUser.loggedUser.name}</a>
          <div
            className="navbar-dropdown has-background-dark"
            style={{ border: "none" }}
          >
            <a
              className="navbar-item has-background-dark has-text-white"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
