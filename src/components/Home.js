import React, { Component } from 'react';
import { Input, List } from 'semantic-ui-react'

class Home extends Component {

  constructor(props) {
    super(props);

    this.props.findAllItems();

    this.state = {
      text: ''
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.listItem = this.listItem.bind(this);
  }



  listItem(item, i) {
    return (
      <List.Item key={i}>
        <List.Content>
          <List.Content floated='right'>
            <List.Icon 
              color='red' 
              name='remove'
              onClick={() => this.props.removeItem(item.id)}/>
          </List.Content>
          <List.Content className={item.complete ? 'complete' : 'active'} onClick={() => this.props.updateItem(item.id, {text: item.text, complete: !item.complete})}>
            {item.text}
          </List.Content>
        </List.Content>
      </List.Item>
    );
  }

  handleKeyDown(e) {
    // enter key
    if (e.keyCode !== 13) {
      return;
    }

		e.preventDefault();

    const text = this.state.text.trim();
    if (text) {
      this.props.createItem({
        text,
        complete: false
      });
      this.setState({text: ''});
    }
  }

  render() {
    return (
      <div>
        <Input 
          fluid 
          placeholder='What needs to be done?'
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
          onKeyDown={this.handleKeyDown}/>
        <List 
          divided 
          relaxed 
          size='massive'
          verticalAlign='middle'>
          {this.props.items.all.map(this.listItem)}
        </List>
      </div>
    );
  }
}

export default Home;
