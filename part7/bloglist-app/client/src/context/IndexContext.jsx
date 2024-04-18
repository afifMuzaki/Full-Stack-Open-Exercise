import { createContext, useEffect, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import blogService from "../services/blogs";
import { MessageReducer } from "../reducers/message";

export const IndexContext = createContext();

const IndexContextProvider = (props) => {
  const [messageValue, messageDispatch] = useReducer(MessageReducer, null);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setLoggedUser(user);
    }
  }, []);

  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const blogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  if (usersResult.isLoading || blogsResult.isLoading) return <p>loading...</p>;

  const users = usersResult.data;
  const blogs = blogsResult.data;
  const message = { value: messageValue, dispatch: messageDispatch };
  const authUser = { loggedUser, setLoggedUser };

  return (
    <IndexContext.Provider value={{ users, blogs, message, authUser }}>
      {props.children}
    </IndexContext.Provider>
  );
};

export default IndexContextProvider;
