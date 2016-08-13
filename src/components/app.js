import React, { Component } from 'react';
import NavBar from '../containers/navbar';
import TagSearchBar from '../containers/tag-search-bar';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div id="app">
        <NavBar />
        <TagSearchBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
