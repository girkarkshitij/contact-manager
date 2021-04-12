import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>
        <i className='fas fa-user'></i> {user && user.name}
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <span className='hide-sm'>
            <i className='fas fa-sign-out-alt'></i>Log Out{' '}
          </span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        {' ' + title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'far fa-address-book',
};

export default Navbar;
