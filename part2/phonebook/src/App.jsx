import { useState } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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