import React, { Component } from 'react';
import { Content } from 'native-base';
import { FooterNav, Header } from '../organisms';
import styles from './style';

class Screen extends Component {
  static propTypes = {};

  componentDidMount() {

  }

  handleBack = () => {
    console.log('back')
  };

  handleOpenMenu = () => {
    console.log('back')
  };

  render() {
    const { title } = this.props;

    return (
      <Container>
        <Header
          title={title}
          handleBack={this.handleBack}
          handleOpenMenu={this.handleOpenMenu}
        />
        <Content>
          {this.props.children}
        </Content>
        <FooterNav />
      </Container>
    );
  }
}

export default Screen;
