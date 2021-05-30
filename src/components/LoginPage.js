import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';

import { loginAction } from '../store/actions';
import { getIsLogged, getUi } from '../store/selectors';

const Login = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector(getIsLogged);

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    wantsToBeRemembered: true,
  });

  const isLoading = useSelector(getUi).loading;

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (isLogged) {
      // onLogin();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const { email, password } = credentials;
  const error = useSelector(getUi).error;

  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'wantsToBeRemembered':
        setCredentials((oldValue) => ({
          ...oldValue,
          wantsToBeRemembered: event.target.checked,
        }));
        break;

      default:
        setCredentials((oldValue) => ({
          ...oldValue,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginAction(credentials));
  };

  return (
    <div className='login-container'>
      <form className='form-login' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className='form-login-email'
          name='email'
          id='email'
          placeholder='email'
          onChange={handleChange}
          disabled={isLoading}
        />
        <input
          className='form-login-password'
          name='password'
          id='password'
          type='password'
          placeholder='Contraseña'
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          className='login-button'
          disabled={
            isLoading || !email || !password || email.indexOf('@') === -1
          }
        >
          Login
        </button>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <input
            type='checkbox'
            id='wantsToBeRemembered'
            name='wantsToBeRemembered'
            checked={credentials.wantsToBeRemembered}
            onChange={handleChange}
            disabled={isLoading}
          />
          &nbsp;
          <label style={{ fontSize: 12 }} htmlFor='wantsToBeRemembered'>
            Remember me
          </label>
        </div>
      </form>
      <Loading isLoading={isLoading} />
      {error ? <ErrorMessage error={error} /> : ''}
    </div>
  );
};

export default Login;
