import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value)
    };

    return {
        type,
        value,
        onChange
    };
};

export const useCountry = (name = "") => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (name === "") return;
            
            const countryData = await axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name.toLowerCase()}`)
                .then(res => ({ ...res, found: true }))
                .catch(() => ({ found: false }));
                
            setCountry(countryData);
        };

        fetchData();
    }, [name]);

    return country;
};