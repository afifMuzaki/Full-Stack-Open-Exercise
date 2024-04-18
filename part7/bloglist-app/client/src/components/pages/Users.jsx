import { Link } from "react-router-dom";
import userService from "../../services/users";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    enabled: true,
  });

  const users = usersResult.data;
  let number = 1;

  return (
    <div>
      <h4 className="title is-4 mb-1">Users</h4>
      <table className="table is-hoverable is-fullwidth is-striped">
        <thead>
          <tr>
            <th>no.</th>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{number++}</td>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
