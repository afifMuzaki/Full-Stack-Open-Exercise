import { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons);
      })
      .catch(err => {
        setMessage({ type: 'error', text: 'Oopps! Something wrong' });
        console.error(err.message);

        setTimeout(() => {
          setMessage({})
        }, 5000);
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
        const filtered = persons.map(person => {
          if (person.id === res.id) {
            return {...person, number: res.number};
          }

          return person;
        });

        setPersons(filtered);
        setMessage({ type: 'success', text: `${res.name}'s number was successfully updated` });
        setNewName('');
        setNewNumber('');

        setTimeout(() => {
          setMessage({})
        }, 5000);
      })
      .catch(err => {
        setMessage({ type: 'error', text: `Information of '${personData.name}' has already been removed from server` });
        console.error(err.message);

        setTimeout(() => {
          setMessage({})
        }, 5000);

        setPersons(persons.filter(person => person.id !== personData.id));
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
        // id: (persons.length + 1).toString(),
      })
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setMessage({ type: 'success', text: `Added ${newName}` })
          setNewName('');
          setNewNumber('');

          setTimeout(() => {
            setMessage({})
          }, 5000)
        })
        .catch(err => {
          setMessage({ type: 'error', text: 'Oopps! Something wrong' });
          console.error(err.message);

          setTimeout(() => {
            setMessage({})
          }, 5000);
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
          setMessage({ type: 'error', text: 'Oopps! Something wrong' });
          console.error(err.message);

          setTimeout(() => {
            setMessage({})
          }, 5000);
        });
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
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
