import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
  } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrentContact();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' + (type === 'Personal' ? 'badge-primary' : 'badge-success')
          }
          style={{ float: 'right' }}
        >
          {type}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope'></i>
            {' ' + email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone-square-alt'></i>
            {' ' + phone}
          </li>
        )}
      </ul>
      <div>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentContact(contact)}
        >
          <i className='fas fa-edit'></i>
        </button>
        <button className='btn btn-sm btn-danger' onClick={onDelete}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
