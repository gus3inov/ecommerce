import React from 'react';
import { NativeRouter, Link } from 'react-router-native';
import { Switch, Route } from 'react-router';

import Signup from './screens/Signup';
import Login from './screens/Login';

export default () => (
    <NativeRouter>
        <Switch>
            <Route exact path="/" component={Signup}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
    </NativeRouter>
);
