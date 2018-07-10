import React from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TOKEN_KEY } from '../constants';

const refreshTokenMutation = gql`
  mutation {
    refreshToken
  }
`;

@graphql(refreshTokenMutation)
class DefaultRoute extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if(!token) {
      this.props.history.push('/signup');
      return;
    }

    let response;
    try {
      response = await this.props.mutate();
    } catch (err) {
      console.log('error', err)
      this.props.history.push('/signup');
      return;
    }

    const { refreshToken } = response.data;
    await AsyncStorage.setItem(TOKEN_KEY, refreshToken);
    this.props.history.push('/products');
  }

  render() {
    return (
      <Container>
        <Content>
          <Spinner  color="red" />
        </Content>
      </Container>
    );
  }
}

export default DefaultRoute;
