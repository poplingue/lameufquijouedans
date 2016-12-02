import React from 'react';
import { render } from 'react-dom';

class Actor extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
    console.log('constructor', this.state.visible)
  }
  render() {
    return (
      <div className={this.state.visible ? "on" : "off"}>
        <p>{this.props.name}</p>
        <img src={this.props.img ? 'https://image.tmdb.org/t/p/w154' + this.props.img : 'http://lorempixel.com/154/231/animals/'} />
      </div>)

  }
  componentDidUpdate(prevProps) {
    if (this.state.visible) {
      this.setState({
        visible: !this.state.visible
      })
    }
  }
}
export default Actor;