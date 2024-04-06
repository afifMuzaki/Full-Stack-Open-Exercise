const User = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs < 1 ? (
        <p>no blogs added</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
