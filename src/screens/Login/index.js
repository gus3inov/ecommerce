import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Form,
  Button,
  Text,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../../ui/atoms/TextField';
import Screen from '../../ui/templates/Screen';
import styles from './style';
import { TOKEN_KEY } from '../../constants';

const loginMutation = gql`
  mutation($email: String!, $password: String!){
    login(email: $email, password: $password){
      payload {
        token
      }
      error {
        field
        msg
      }
    }
  }
`;

const defaultState = {
  values: {
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

@graphql(loginMutation)
class Login extends Component {
  state = defaultState;

  login = async () => {
    if(this.state.isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });
    const response = await this.props.mutate({
      variables: this.state.values,
    });

    const { payload, error } = response.data.login;
    if (payload !== null) {
      await AsyncStorage.setItem(TOKEN_KEY, payload.token);
      this.setState(defaultState);
      this.props.history.push('/products');
    } else {
      this.setState({
        errors: {
          [error.field]: error.msg,
        },
        isSubmitting: false,
      });
    }
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  redirectSignupPage = () => {
    this.props.history.push('/signup');
  };

  render() {
    const { errors, values: { email, password } } = this.state;

    return (
      <Screen title="Login">
        <Form style={styles.form}>
          <TextField
            value={email}
            name="email"
            placeholder="Email"
            onChangeText={this.onChangeText}
          />
          {errors.email
          && <Text>
            {errors.email}
          </Text>}
          <TextField
            value={password}
            name="password"
            secureTextEntry
            placeholder="Password"
            onChangeText={this.onChangeText}
          />
          {errors.password
          && <Text>
            {errors.password}
          </Text>}
          <Button
            onPress={this.login}
            full
            success
          >
            <Text>
              { 'Login' }
            </Text>
          </Button>
          <Text style={styles.textOr}>
            { 'or' }
          </Text>
          <Button
            onPress={this.redirectSignupPage}
            full
          >
            <Text>
              { 'Create account' }
            </Text>
          </Button>
        </Form>
      </Screen>
    );
  }
}

export default Login;
