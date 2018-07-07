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
        { 'Products' }
      </Screen>
    );
  }
}

export default Products;
