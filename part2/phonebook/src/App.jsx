import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })
    .catch(err => {
      alert('Error: unable to connect to server');
      console.error(err.message);
    });
  }, []);

  const shownPerson = filter ? persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  ) : persons;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameExist = persons.find(person => 
      person.name.toLowerCase()
      .includes(newName.toLowerCase())
    );

    if (isNameExist) return alert(`${newName} is already added to phonebook`);

    setPersons(persons.concat({ 
      name: newName, 
      number: newNumber, 
      id: persons.length + 1 
    }));

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} handleChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={{ handleNameChange, handleNumberChange }}
        inputValue={{ newName, newNumber }} />

      <h3>Numbers</h3>
      <Persons persons={shownPerson} />
    </div>
  )
}

export default App