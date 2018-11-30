import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import { Content, Container } from 'native-base';
import { FooterNav, Header } from '../organisms';

@withRouter
class Screen extends Component {
  static propTypes = {};

  componentDidMount() {}

  handleBack = () => {
    this.props.history.goBack();
  };

  handleOpenMenu = () => {
    console.log('open menu');
  };

  render() {
    const { title, children } = this.props;

    return (
      <Container>
        <Header
          title={title}
          handleBack={this.handleBack}
          handleOpenMenu={this.handleOpenMenu}
        />
        {children}
        <FooterNav />
      </Container>
    );
  }
}

export default Screen;
