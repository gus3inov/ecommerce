import React from 'react';
import { FlatList, AsyncStorage, View } from 'react-native';
import {
  Icon,
  Button,
  Text,
  Container,
  Header,
  Item,
  Input,
} from 'native-base';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import Screen from 'ecommerce-client/src/ui/templates/Screen';
import ProductCard from 'ecommerce-client/src/ui/organisms/ProductCard';
import TextField from 'ecommerce-client/src/ui/atoms/TextField';
import { TOKEN_KEY } from 'ecommerce-client/src/constants';
import styles from './style';

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
      searchValue: '',
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

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  }

  handleSearch = (value) => {

  };

  render() {
    const { data: { products }, loading, history } = this.props;
    const { userId, searchValue } = this.state;
    if (loading || !products) {
      return null;
    }

    return (
      <Screen title="Products">
        <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <Button
            style={styles.createButton}
            onPress={() => history.push('/products/add')}
            iconLeft
            light
          >
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
