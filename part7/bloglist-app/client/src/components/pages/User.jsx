import { Link } from "react-router-dom";

const User = ({ user }) => {
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
