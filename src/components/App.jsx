import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { PhonebookContainer, Title, TitleCont } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = addContact => {
    const { contacts } = this.state;
    // запис id до кожного контакту за допомогою бібіліотеки
    addContact.id = nanoid(10);
    if (contacts.find(contact => contact.name === addContact.name)) {
      return alert(`${addContact.name} is already is contacts`);
    }
    this.setState(prevState => ({
      contacts: [addContact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  //  в попередньому state фільтруємо по id, залишаємо всі, де не співпадають id
  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    // фільтруємо контакти, filter нормалізуємо,
    //  щоб на кажній ітерації не викликати ловерКейс
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <Title>PhoneBook</Title>

        <PhonebookContainer>
          <PhonebookForm onSubmit={this.addContact} />
        </PhonebookContainer>
        <TitleCont>Contacts</TitleCont>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
