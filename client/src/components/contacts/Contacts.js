import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return (
      <h3 className='card text-center'>
        <i className='far fa-frown'></i> No contacts to show
      </h3>
    );
  }

  if (contacts !== null && !loading) {
    return (
      <Fragment>
        {filtered !== null
          ? filtered.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          : contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))}
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Contacts;
