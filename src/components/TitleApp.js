import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../api/auth';
import ConfirmButton from './ConfirmButton';
import { getIsLogged, getUsername } from '../store/selectors';
import { authLogout } from '../store/actions';
import { connect } from 'react-redux';

const TitleApp = ({ isLogged, onLogout, me }) => {
  const handleLogout = () => {
    logout().then(onLogout);
  };

  return (
    <div className='title-container'>
      <h1>
        <div className='title'>
          <NavLink
            to='/adverts'
            className='title'
            activeStyle={{ textShadow: '0px 3px 2px black' }}
          >
            NodePop
          </NavLink>
        </div>
      </h1>
      <div className='subtitle-container'>
        {isLogged ? (
          <>
            {me ? (
              <div style={{ textAlign: 'center', paddingBottom: 5 }}>
                Logged as <b>{me}</b>
              </div>
            ) : (
              ''
            )}{' '}
            <ConfirmButton
              iconButton={'/images/logout.png'}
              titleButton={' Logout'}
              okAction={handleLogout}
              message='Sure you wanna leave?'
              subtitle='We will miss you'
            />
            <div>
              <NavLink
                to='/advert/new'
                className='newAdLink'
                activeClassName='activeLink'
              >
                <b>+</b> New Advert
              </NavLink>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogged: getIsLogged(state),
  me: getUsername(state),
});
const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleApp);
