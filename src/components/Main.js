import React, { Component } from 'react';

import { Header, Container } from 'semantic-ui-react'

import { socketApp } from '../store';

class Main extends Component {

  componentWillMount() {
    const itemService = socketApp.service('items');
    itemService.on('created', (item) => this.props.createdItem(item));
    itemService.on('updated', (item) => this.props.updatedItem(item));
    itemService.on('removed', (item) => this.props.removedItem(item));
  }

  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center">
          todos
        </Header>
        {React.cloneElement(this.props.children, this.props)}
      </Container>
    )
  }
}

export default Main;

