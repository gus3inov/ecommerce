import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Input, Label, Item, Form, Button, Text } from 'native-base';
import { TOKEN_KEY } from '../../constants';
import Screen from '../../ui/templates/Screen';

class Profile extends Component {
  componentDidMount() {}

  logout = () => {
    AsyncStorage.setItem(TOKEN_KEY, '');
  };

  render() {
    return (
      <Screen title="Profile">
        <Button onClick={this.logout}>
          <Text>{'Logout'}</Text>
        </Button>
      </Screen>
    );
  }
}

export default Profile;
