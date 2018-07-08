import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Input,
  Label,
  Item,
  Form,
  Button,
  Text,
} from 'native-base';
import Screen from '../../ui/templates/Screen';

class Profile extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Screen title="Profile">
        <Text>
          { 'Profile' }
        </Text>
      </Screen>
    );
  }
}

export default Profile;
