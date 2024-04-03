import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blogData, config);
  return response.data;
};

const update = async (blogData, blogId) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blogData);
  return response.data;
};

const destroy = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { setToken, getAll, create, update, destroy };
