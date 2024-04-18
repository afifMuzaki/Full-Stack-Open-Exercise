import { Link } from "react-router-dom";
import { useContext } from "react";
import { IndexContext } from "../../context/IndexContext";
import { useMatch } from "react-router-dom";

const User = () => {
  const { users } = useContext(IndexContext);
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!user) return null;
  const userBlogs = [...user.blogs];

  return (
    <div>
      <h4 className="title is-4 mb-5">Blogs Added by {user.name}</h4>
      {user.blogs < 1 ? (
        <p>no blogs added by this user</p>
      ) : (
        <ul>
          {userBlogs.map((blog) => (
            <Link
              key={blog.id}
              className="button is-link is-outlined is-block mb-1"
              to={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
