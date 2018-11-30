import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Form, Button, Text } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../../ui/atoms/TextField';
import Screen from '../../ui/templates/Screen';
import styles from './style';
import { TOKEN_KEY } from '../../constants';

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const defaultState = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

@graphql(signUpMutation)
class Signup extends Component {
  state = defaultState;

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch (err) {
      this.setState({
        errors: {
          email: 'Already taken',
        },
        isSubmitting: false,
      });

      return;
    }

    await AsyncStorage.setItem(TOKEN_KEY, response.data.signup.token);
    this.setState(defaultState);
    this.props.history.push('/products');
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  redirectLoginPage = () => {
    this.props.history.push('/login');
  };

  render() {
    const {
      errors,
      values: { name, email, password },
    } = this.state;

    return (
      <Screen title="Signup">
        <Form style={styles.form}>
          <TextField
            value={name}
            name="name"
            placeholder="Username"
            onChangeText={this.onChangeText}
          />
          {errors.email && <Text>{errors.email}</Text>}
          <TextField
            value={email}
            name="email"
            placeholder="Email"
            onChangeText={this.onChangeText}
          />
          <TextField
            value={password}
            name="password"
            secureTextEntry
            placeholder="Password"
            onChangeText={this.onChangeText}
          />
          <Button onPress={this.submit} full success>
            <Text>{'Submit'}</Text>
          </Button>
          <Text style={styles.textOr}>{'or'}</Text>
          <Button onPress={this.redirectLoginPage} full>
            <Text>{'Login'}</Text>
          </Button>
        </Form>
      </Screen>
    );
  }
}

export default Signup;
