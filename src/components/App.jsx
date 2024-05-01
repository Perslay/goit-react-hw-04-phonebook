import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../styles/App.module.css';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    // get from local storage
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    this.setState({ contacts: parsedContacts || [] });
  }

  componentDidUpdate() {
    // remove from or add to local storage
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleName = evt => {
    this.setState({ name: evt.target.value });
  };

  handleNumber = evt => {
    this.setState({ number: evt.target.value });
  };

  handleFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  add = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const newName = this.state.name;
    const newNumber = this.state.number;

    const nameExists = this.state.contacts.some(
      contact => contact.name === newName
    );

    if (nameExists) {
      alert(newName + ' is already in contacts.');
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            name: newName,
            number: newNumber,
            id: nanoid(),
          },
        ],
      }));
    }

    form.reset();
  };

  deleteContact = id => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return { contacts: updatedContacts };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const { add, deleteContact, handleFilter, handleName, handleNumber } = this;

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
  }
}
