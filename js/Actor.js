import React from 'react';
import { render } from 'react-dom';

class Actor extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
  }
  render() {
    return (
      <div className={this.state.visible ? "on" : "off"}>
        <p>{this.props.name}</p>
        <img src={this.props.img ? 'https://image.tmdb.org/t/p/w154' + this.props.img : 'http://lorempixel.com/154/231/animals/'} />
      </div>)
  }
  componentDidMount() {
    // console.log('test', document.querySelectorAll('.actor-list li div')[0])
    document.querySelectorAll('.actor-list li div')[0].classList.remove('on')
    document.querySelectorAll('.actor-list li div').className = 'off'
  }
}
export default Actor;