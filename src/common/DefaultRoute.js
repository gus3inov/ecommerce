import React from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TOKEN_KEY } from '../constants';
import { addUser } from '../reducers/user';

const refreshTokenMutation = gql`
  mutation {
    refreshToken {
      token
      userId
    }
  }
`;

@connect(null, dispatch => bindActionCreators({ addUserAction: addUser }, dispatch))
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

    const { refreshToken: { token: newToken, userId } } = response.data;
    await AsyncStorage.setItem(TOKEN_KEY, newToken);
    this.props.addUserAction({ userId });
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
