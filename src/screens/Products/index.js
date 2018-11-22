import React from 'react';
import { FlatList, AsyncStorage } from 'react-native';
import {
  Icon,
  Button,
  Text,
} from 'native-base';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import Screen from 'ecommerce-client/src/ui/templates/Screen';
import ProductCard from 'ecommerce-client/src/ui/organisms/ProductCard';
import { TOKEN_KEY } from 'ecommerce-client/src/constants';

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

export const deleteProductMutation = gql`
  mutation($id: ID!) {
    deleteProduct(where: {id: $id}) {
      id
    }
  }
`


@compose(
  graphql(productsQuery),
  graphql(deleteProductMutation, { name: 'deleteProduct' })
)
class Products extends React.Component {
  state = {
      userId: null,
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 
    const { userId } = jwtDecode(token);
    this.setState({
      userId,
    })
  }

  deleteProduct = async (id) => {
    const { deleteProduct } = this.props;
    await deleteProduct({
      variables: {
        id,
      },
      update: (store) => {
        const data = store.readQuery({ query: productsQuery });
        const updateProducts = data.products.filter(x => x.id !== id);
        store.writeQuery({
          query: productsQuery,
          data: {
            ...data,
            products: updateProducts,
          }
        });
      },
    })
  }

  recordProduct = (data) => this.props.history.push({
    pathname: `products/record/${data.id}`,
    state: data,
  })

  render() {
    const { data: { products }, loading, history } = this.props;
    const { userId } = this.state;
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
              data={products.map(x => ({
                ...x,
                showButtons: userId === x.seller.id,
              }))}
              renderItem={({ item }) => (
                <ProductCard
                  key={item.id}
                  userId={userId}
                  data={item}
                  handleRecord={this.recordProduct}
                  handleDelete={this.deleteProduct}
                />
              )}
            />
          )
        }
      </Screen>
    );
  }
};

export default Products;
