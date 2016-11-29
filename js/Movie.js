import React from 'react';
import { render } from 'react-dom';

class Movie extends React.Component {
  render() {
    return (
      <div>{this.props.movie}</div>
    )

  }
}
export default Movie;