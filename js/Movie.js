import React from 'react';
import { render } from 'react-dom';

class Movie extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.movie}</div>
      </div>)

  }
}
export default Movie;