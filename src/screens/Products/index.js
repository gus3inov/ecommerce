import React from 'react';
import { FlatList } from 'react-native';
import {
  Icon,
  Button,
  Text,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Screen from '../../ui/templates/Screen';
import ProductCard from '../../ui/organisms/ProductCard';

const Products = ({ data: { products }, loading, history }) => {
  if (loading || !products) {
    return null;
  }
  console.log(products)
  return (
    <Screen title="Products">
      <Button onPress={() => history.push('/products/add')} iconLeft light>
        <Icon name="add" />
        <Text>
          { 'Create product' }
        </Text>
      </Button>
      <FlatList
        keyExtractor={item => item.id}
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id}
            title={item.name}
            price={item.price}
            image={item.pictureUrl}
          />
        )}
      />
    </Screen>
  );
};

export const productsQuery = gql`
  {
    products {
      id
      price
      pictureUrl
      name
    }
  }
`;

export default graphql(productsQuery)(Products);
