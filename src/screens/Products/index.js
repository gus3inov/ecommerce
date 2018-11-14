import React from 'react';
import { FlatList } from 'react-native';
import {
  Icon,
  Button,
  Text,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import Screen from 'ecommerce-client/src/ui/templates/Screen';
import ProductCard from 'ecommerce-client/src/ui/organisms/ProductCard';

const Products = ({ userId, data: { products }, loading, history }) => {
  if (loading || !products) {
    return null;
  }

  return (
    <Screen title="Products">
      <Button onPress={() => history.push('/products/add')} iconLeft light>
        <Icon name="add" />
        <Text>
          { 'Create product' }
        </Text>
      </Button>
      {
        products.length !== 0 && (
          <FlatList
            keyExtractor={item => item.id}
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                key={item.id}
                userId={userId}
                data={item}
              />
            )}
          />
        )
      }
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
      seller {
        id
      }
    }
  }
`;

export default connect(state => ({
  userId: state.user.userId
}))(graphql(productsQuery)(Products));
