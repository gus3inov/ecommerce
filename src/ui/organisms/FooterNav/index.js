import React, { Component } from 'react';
import { Link } from 'react-router-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import styles from './style';

class FooterNav extends Component {
  static propTypes = {};

  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
              <Button>
                <Link to="/profile">
                  <Icon name="person" />
                </Link>
              </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default FooterNav;
