import React from 'react';
import { render } from 'react-dom';

class Actor extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <img src={this.props.img ? 'https://image.tmdb.org/t/p/w154' + this.props.img : 'http://lorempixel.com/154/231/animals/'} />
      </div>)

  }
}
export default Actor;