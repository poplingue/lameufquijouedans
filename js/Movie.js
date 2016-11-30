import React from 'react';
import { render } from 'react-dom';

class Movie extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.movie}</div>
        <img src={this.props.poster ? 'https://image.tmdb.org/t/p/w92' + this.props.poster : 'http://lorempixel.com/92/138/animals/'} />
      </div>
    )

  }
}
export default Movie;