import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client';

import { productsQuery } from 'ecommerce-client/src/screens/Products';
import Form from 'ecommerce-client/src/ui/organisms/Form';
import Screen from 'ecommerce-client/src/ui/templates/Screen';

const createProductMutation = gql`
  mutation($name: String!, $price: Float!, $picture: Upload!) {
    createProduct(name: $name, price: $price, picture: $picture) {
      __typename
      id
      name
      price
      pictureUrl
      seller {
        id
      }
    }
  }
`;

@graphql(createProductMutation)
class NewProduct extends Component {
  submit = async values => {
    const { pictureUrl, name, price } = values;
    const picture = new ReactNativeFile({
      uri: pictureUrl,
      type: 'image/png',
      name: 'i-am-a-name',
    });

    const { state } = this.props.location;
    console.log('state', state);
    try {
      await this.props.mutate({
        variables: {
          name,
          price,
          picture,
        },
        update: (store, { data: { createProduct } }) => {
          const data = store.readQuery({
            query: productsQuery,
            variables: state.variables,
          });
          data.productsConnection.edges = [
            {
              __typename: 'Node',
              cursor: createProduct.id,
              node: createProduct,
            },
            ...data.productsConnection.edges,
          ];
          data.products.push(createProduct);
          store.writeQuery({
            query: productsQuery,
            data,
            variables: state.variables,
          });
        },
      });
    } catch (err) {
      console.error(err);
      return;
    }

    this.props.history.push('/products');
  };

  render() {
    return (
      <Screen title="Create Product">
        <Form submit={this.submit} />{' '}
      </Screen>
    );
  }
}

export default NewProduct;
