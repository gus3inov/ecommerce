import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Icon,
  Button,
  Text,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Screen from '../../ui/templates/Screen';
import styles from './style';

class Products extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Screen title="Products">
        <Button onPress={() => this.props.history.push('/products/add')} iconLeft light>
          <Icon name="add" />
          <Text>
            { 'Create product' }
          </Text>
        </Button>
      </Screen>
    );
  }
}

export default Products;
