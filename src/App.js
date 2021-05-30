import React from 'react';
import AdvertsPage from './components/AdvertsPage';
import TitleApp from './components/TitleApp';
import AdvertPage from './components/AdvertPage';
import NewAdvertPage from './components/NewAdvertPage';
import LoginPage from './components/LoginPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { aboutMe } from './api/auth';
import NotFoundPage from './components/NotFoundPage';
import { useSelector } from 'react-redux';
import { getIsLogged } from './store/selectors';
import { useDispatch } from 'react-redux';
import { setProfile } from './store/actions';

function App() {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  //const profile = useSelector(getUsername);

  if (isLogged) {
    aboutMe().then((user) => {
      dispatch(setProfile(user));
    });
  }

  return (
    <div className='App'>
      <TitleApp />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/adverts' />
        </Route>
        <PrivateRoute
          exact
          path='/adverts'
          render={() => (
            <div>
              <AdvertsPage />
            </div>
          )}
        />
        <PrivateRoute
          path='/advert/new'
          render={() => (
            <>
              <NewAdvertPage />
            </>
          )}
        />
        <PrivateRoute
          path='/advert/:id'
          render={({ match }) => (
            <div>
              <AdvertPage adId={match} />
            </div>
          )}
        />
        <Route exact path='/login'>
          <LoginPage />
        </Route>

        <Route path='/404'>
          <NotFoundPage />
        </Route>
        <Route>
          <Redirect to='/404' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
