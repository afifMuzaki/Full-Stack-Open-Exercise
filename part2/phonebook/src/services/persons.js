import axios from "axios";
const baseUrl = '/api/persons';

const getAll = async () => 
    await axios.get(baseUrl).then(res => res.data);

const create = async newObject => 
    await axios.post(baseUrl, newObject).then(res => res.data);

const destroy = async id => 
    await axios.delete(`${baseUrl}/${id}`).then(res => res.data);

const update = async (id, updatedObject) => 
    await axios.put(`${baseUrl}/${id}`, updatedObject).then(res => res.data);

export default { getAll, create, destroy, update }
