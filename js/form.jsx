import React from 'react';
import { render } from 'react-dom';

class Form extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder='query' id="query" />
        <input type="submit" value="search" />
      </form>)
  }
}

render(<Form />, document.getElementById('form'));