import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header as NativeHeader,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import styles from './style';

const Header = (props) => {
  const {
    title,
    handleBack,
    handleOpenMenu,
  } = props;

  return (
    <Container>
      <NativeHeader>
        <Left>
          <Button onPress={handleBack} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>
            { title }
          </Title>
        </Body>
        <Right>
          <Button onPress={handleOpenMenu} transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </NativeHeader>
    </Container>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
};

export default Header;
