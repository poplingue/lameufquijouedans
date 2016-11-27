import React from 'react';
import { render } from 'react-dom';

class Actor extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <img src={'https://image.tmdb.org/t/p/w500' + this.props.img} />
      </div>)

  }
}
export default Actor;