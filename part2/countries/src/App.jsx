import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search'
import List from './components/List';

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(res => {
      setCountries(res.data);
      console.log('country data has been loaded!');
    })
    .catch(err => console.log(err));
  }, []);

  const filterCountries = () => {
    if (query && selectedCountry.length === 0) return countries.filter(country => 
        country.name.common.toLowerCase()
        .includes(query.toLowerCase()));

    if (query && selectedCountry.length === 1) return selectedCountry;

    if (!query) return false;

    return [];
  };

  const shownCountries = filterCountries();

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSelectedCountry([]);
  };

  const handleShowClick = (name) => {
    const country = countries.find(country => country.name.common === name);
    setSelectedCountry([country]);
  };

  return (
    <>
      <Search handleChange={handleSearchChange} value={query} />
      <List countries={shownCountries} handleShowClick={handleShowClick} />
    </>
  )
}

export default App;