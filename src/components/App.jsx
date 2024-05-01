import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from '../styles/App.module.css';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    // get from local storage
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    setContacts(parsedContacts || []);
  }, []);

  useEffect(() => {
    // remove from or add to local storage
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleName = evt => {
    setName(evt.target.value);
  };

  const handleNumber = evt => {
    setNumber(evt.target.value);
  };

  const handleFilter = evt => {
    setFilter(evt.target.value);
  };

  const add = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const newName = name;
    const newNumber = number;

    const nameExists = contacts.some(contact => contact.name === newName);

    if (nameExists) {
      alert(newName + ' is already in contacts.');
    } else {
      setContacts(prevContacts => [
        ...prevContacts,
        {
          name: newName,
          number: newNumber,
          id: nanoid(),
        },
      ]);
    }

    form.reset();
  };

  const deleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div className={css.appContainer}>
      <h1 className={css.firstHeading}>Phonebook</h1>
      <ContactForm
        add={add}
        nameInputId={nanoid()}
        numberInputId={nanoid()}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h2 className={css.secondHeading}>Contacts</h2>
      <Filter handleFilter={handleFilter} filterInputId={nanoid()} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};
