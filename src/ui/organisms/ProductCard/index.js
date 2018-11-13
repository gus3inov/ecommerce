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
  Right,
} from 'native-base';
import styles from './style';

const ProductCard = (props) => {
  const {
    userId,
    data,
  } = props;
  const {
    id,
    name,
    price,
    pictureUrl,
    seller,
  } = data;
  console.log('product', pictureUrl);
  return (
    <Card>
      <CardItem>
        <Left>
          {/* <Thumbnail
            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6l4GnWbN18Dz5i1kjlSRJTFcfO4lru1MXAhjxKtcT-cfumC50'}}/> */}
          <Body>
          <Text>{name}</Text>
          {/* <Text note>GeekyAnts</Text> */}
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{uri: `http://10.0.3.2:4000/${pictureUrl}`}}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="card"/>
            <Text>{price}</Text>
          </Button>
        </Left>
        <Body>
        <Button transparent>
          <Icon active name="chatbubbles"/>
          <Text>4 Comments</Text>
        </Button>
        </Body>
      </CardItem>
      {
        userId === seller.id ?
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="create" />
                <Text>{'Edit'}</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Icon active name="trash" />
                <Text>{'Delete'}</Text>
              </Button>
            </Right>
          </CardItem> : null
      }
    </Card>
  );
};

export default ProductCard;
