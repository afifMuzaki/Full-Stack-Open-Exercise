import { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons);
      })
      .catch(err => {
        alert('Oopps! Something wrong');
        console.error(err.message);
      });
  }, []);

  const shownPerson = filter ? persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  ) : persons;

  const updateNumber = (personData) => {
    personService.update(
      personData.id,
      { ...personData, number: newNumber }
    )
      .then(res => {
        const filtered = persons.filter(person => person.id !== res.id);
        setPersons(filtered.concat(res));
        setNewName('');
        setNewNumber('');
      })
      .catch(err => {
        alert('Oopps! Something wrong');
        console.error(err.message);
      });
  };

  const checkPersonExist = () => {
    const existedPerson = persons.find(person =>
      person.name.toLowerCase().
        includes(newName.toLowerCase())
    );

    if (!existedPerson) return false;
    
    const changeConfirm = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
    if (changeConfirm) updateNumber(existedPerson);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!checkPersonExist()) {
      personService.create({
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      })
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(err => {
          alert('Oopps! Something wrong');
          console.error(err.message);
        });
    }
  };

  const handleDeleteClick = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      personService.destroy(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== res));
        })
        .catch(err => {
          alert('Oopps! Something wrong');
          console.error(err.message);
        });
    }
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
      <Persons persons={shownPerson} handleDelete={handleDeleteClick} />
    </div>
  )
}

export default App