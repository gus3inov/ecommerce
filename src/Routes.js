import React from 'react';
import { NativeRouter } from 'react-router-native';
import { Switch, Route } from 'react-router';

import Signup from './screens/Signup';
import Login from './screens/Login';
import Products from './screens/Products';
import NewProduct from './screens/NewProduct';
import Profile from './screens/Profile';
import DefaultRoute from './common/DefaultRoute';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={DefaultRoute} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/add" component={NewProduct} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </NativeRouter>
);
