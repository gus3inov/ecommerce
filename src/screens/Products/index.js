import React from 'react';
import { FlatList, AsyncStorage, Picker } from 'react-native';
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

export const productsQuery = gql`
  query($orderBy: ProductOrderByInput, $where: ProductWhereInput) {
    products(orderBy: $orderBy, where: $where) {
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
      sort: 'name',
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

  onChangeText = (value) => {
    const { data: { refetch } } = this.props;
    this.setState({
      searchValue: value,
    })
    refetch({
      where: {
        name_contains: value,
      }
    })
  }

  handleSearch = (value) => {

  };

  handleSort = (value) => {
    const { data: { refetch, variables } } = this.props;

    if(value === 'name') {
      refetch({
        orderBy: variables.orderBy === 'name_ASC' ? 'name_DESC' : 'name _ASC'
      })
    } else {
        refetch({
          orderBy: variables.orderBy === 'price_ASC' ? 'price_DESC' : 'price_ASC'
        })
    }

    this.setState({
      sort: value,
    })
  };

  render() {
    const { data: { products, refetch }, loading, history } = this.props;
    const { userId, searchValue, sort } = this.state;
    if (loading || !products) {
      return null;
    }

    return (
      <Screen title="Products">
        <Header searchBar rounded>
            <Item>
              <Icon
                name="ios-search"
              />
              <Input
                placeholder="Search"
                name="search"
                value={searchValue}
                onChangeText={this.onChangeText}
              />
              <Icon name="ios-people" />
            </Item>
          </Header>
          <Button
            onPress={() => history.push('/products/add')}
            iconLeft
            light
          >
          <Icon name="add" />
          <Text>
            { 'Create product' }
          </Text>
        </Button>
        <Picker
            selectedValue={sort}
            style={{ height: 50, width: 100 }}
            onValueChange={this.handleSort}
          >
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Price" value="price" />
        </Picker>
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
