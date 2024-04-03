import { useState, useEffect } from 'react';
import axios from "axios";

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResource = async () => {
            const response = await axios.get(baseUrl);
            setResources(response.data);
        };

        fetchResource();
    }, [baseUrl]);

    const create = async (resource) => {
        const createdResource = await axios.post(baseUrl, resource);
        setResources(resources.concat(createdResource.data));
    };

    const service = {
        create
    };

    return [
        resources, service
    ];
};