import React, { Component } from 'react';
import {
  Form,
  Button,
  Text,
  View,
} from 'native-base';
import { Image } from 'react-native';
import { ImagePicker } from 'expo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client';
import TextField from '../../ui/atoms/TextField';
import Screen from '../../ui/templates/Screen';
import styles from './style';

const defaultState = {
  values: {
    name: '',
    price: '',
    pictureUrl: null,
  },
  errors: {},
  isSubmitting: false,
};

const createProductMutation = gql`
  mutation($name: String!, $price: Float!, $picture: Upload!) {
    createProduct(name: $name, price: $price, picture: $picture) {
      id
    }
  }
`

@graphql(createProductMutation)
class NewProduct extends Component {
  state = defaultState;

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    const { pictureUrl, name, price } = this.state.values;
    const picture = new ReactNativeFile({
      uri: pictureUrl,
      type: 'image/png',
      name: 'i-am-a-name',
    });
  console.log('picture client ', picture)
    try {
      await this.props.mutate({
        variables: {
          name,
          price,
          picture,
        },
      });
    } catch (err) {
      console.log('err happened');
      console.log(err);
      return;
    }

    this.props.history.push('/products');
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('uri', result.uri);

    if (!result.cancelled) {
      this.onChangeText('pictureUrl', result.uri);
    }
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  render() {
    const { values: { name, pictureUrl, price } } = this.state;

    return (
      <Screen title="NewProduct">
        <Form style={styles.form}>
          <TextField
            value={name}
            name="name"
            placeholder="Name"
            onChangeText={this.onChangeText}
          />
          <TextField
            value={price}
            name="price"
            placeholder="Price"
            onChangeText={this.onChangeText}
          />
          <View>
            <Button onPress={this.pickImage}>
              <Text>
                { 'Pick an image from camera roll' }
              </Text>
            </Button>
            {pictureUrl && (
              <Image source={{ uri: pictureUrl }} style={{ width: 200, height: 200 }} />
            )}
          </View>
          <Button
            onPress={this.submit}
            full
            success
          >
            <Text>
              { 'Add product' }
            </Text>
          </Button>
        </Form>
      </Screen>
    );
  }
}

export default NewProduct;
