import React, { Component } from 'react';
import {
  Input,
  Label,
  Item,
  Form,
  Button,
  Text,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from '../../ui/templates/Screen';
import styles from './style';

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!){
    signup(name: $name, email: $email, password: $password){
      token
    }
  }
`;

@graphql(signUpMutation)
class Signup extends Component {
  state = {
    values: {
      name: '',
      email: '',
      password: '',
    },
    errors: {},
    isSubmitting: false,
  };

  submit = async () => {
    if(this.state.isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch(err) {
      console.log('err --------', err);
    }

    console.log('response -------', response);
    this.setState({ isSubmitting: false });
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  render() {
    const { values: { name, email, password } } = this.state;

    return (
      <Screen title="Signup">
        <Form>
          <Item stackedLabel>
            <Label>
              { 'Username' }
            </Label>
            <Input
              onChangeText={value => this.onChangeText('name', value)}
              value={name}
            />
          </Item>
          <Item stackedLabel>
            <Label>
              { 'Email' }
            </Label>
            <Input
              onChangeText={value => this.onChangeText('email', value)}
              value={email}
            />
          </Item>
          <Item stackedLabel>
            <Label>
              { 'Password' }
            </Label>
            <Input
              onChangeText={value => this.onChangeText('password', value)}
              value={password}
              secureTextEntry
            />
          </Item>
          <Button
            onPress={this.submit}
            full
            success>
            <Text>
              { 'Submit' }
            </Text>
          </Button>
        </Form>
      </Screen>
    );
  }
}

export default Signup;
