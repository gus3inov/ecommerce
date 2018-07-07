import React from 'react';
import { NativeRouter, Link } from 'react-router-native';
import { Switch, Route } from 'react-router';

import Signup from './screens/Signup';
import Login from './screens/Login';
import Products from './screens/Products';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
    </Switch>
  </NativeRouter>
);
