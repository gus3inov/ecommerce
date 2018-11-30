import React, { Component } from 'react';
import { Form as NativeForm, Button, Text, View } from 'native-base';
import { Image } from 'react-native';
import { ImagePicker } from 'expo';
import TextField from 'ecommerce-client/src/ui/atoms/TextField';

const defaultState = {
  values: {
    name: '',
    price: '',
    pictureUrl: null,
  },
  errors: {},
  isSubmitting: false,
};

class Form extends Component {
  constructor(props) {
    super(props);
    const { initialValues } = this.props;
    this.state = {
      ...defaultState,
      values: {
        ...defaultState,
        ...initialValues,
      },
    };
  }

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    const errors = await this.props.submit(this.state.values);
    if (errors) {
      this.setState({
        errors,
      });
    }
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

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
    const {
      values: { name, pictureUrl, price },
    } = this.state;

    return (
      <NativeForm>
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
            <Text>{'Pick an image from camera roll'}</Text>
          </Button>
          {pictureUrl && (
            <Image
              source={{ uri: pictureUrl }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <Button onPress={this.submit} full success>
          <Text>{'Add product'}</Text>
        </Button>
      </NativeForm>
    );
  }
}

export default Form;
