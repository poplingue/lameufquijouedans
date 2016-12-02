import React from 'react';
import { render } from 'react-dom';
import Actor from './Actor';

class Movie extends React.Component {
  constructor() {
    super()
    this.listActorHtml = null
    this.listActor = ""
  }
  render() {

    this.listActorHtml = this.props.actorList.map((actor, id) => {
      return <li key={id}><Actor img={actor.img} name={actor.name} visible={false} /></li>;
    })

    this.listActor = (this.props.currentMovie == this.props.id) ? this.listActorHtml : ""

    return (
      <div>
        <p>{this.props.movie}</p>
        <img src={this.props.poster ? 'https://image.tmdb.org/t/p/w92' + this.props.poster : 'http://lorempixel.com/92/138/animals/'} />
        <ul className='actor-list'>
          {this.listActor}
        </ul>
      </div>
    )

  }
}
export default Movie;