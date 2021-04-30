
import React, { Component } from 'react';
 
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: "Header from props",
      content: "Content from props"
    }
  }
  render() {
    return (
      <div>
        Welcome to the Home Page!
        <Header headerProp = {this.state.header}/>
        <Content contentProp = {this.state.content}/>
      </div>
    );
  }
}
class Header extends Component {
  render() {
     return (
        <div>
           <h1>{this.props.headerProp}</h1>
        </div>
     );
  }
}
class Content extends Component {
  render() {
     return (
        <div>
           <h2>{this.props.contentProp}</h2>
        </div>
     );
  }
}
export default Home;