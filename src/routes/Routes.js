import React from 'react';
import Navbar from '../pages/Navbar';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import Login from '../pages/Login';
import Menu from '../pages/Menu';


function Routes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/menu" component={Menu} />
          </Switch>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default Routes;
