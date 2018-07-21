import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';
import styles from './style';

const ProductCard = (props) => {
  const {
    title,
    price,
    image,
  } = props;

  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6l4GnWbN18Dz5i1kjlSRJTFcfO4lru1MXAhjxKtcT-cfumC50'}} />
          <Body>
          <Text>{ title }</Text>
          <Text note>GeekyAnts</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: `http://headphone-review.ru/wp-content/uploads/2018/05/Yandex-Station.jpg` }}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="card" />
            <Text>{ price }</Text>
          </Button>
        </Left>
        <Body>
        <Button transparent>
          <Icon active name="chatbubbles" />
          <Text>4 Comments</Text>
        </Button>
        </Body>
      </CardItem>
    </Card>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
