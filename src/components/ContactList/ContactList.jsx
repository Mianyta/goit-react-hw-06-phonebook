import React, { useMemo } from 'react';
import { List } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filterContacts = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };


  // Внутри вашего компонента перед return
  const filteredContacts = useMemo(() => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filterContacts.toLowerCase());
    });
  }, [contacts, filterContacts]);

  return (
    <List>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </List>);
};
