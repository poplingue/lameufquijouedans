import React from 'react';
import { render } from 'react-dom';
import Actor from './Actor';

class Movie extends React.Component {

  render() {
    let listActorHtml = <ul className='actor-list'>
      {this.props.actorList.map((actor, id) => {
        return <li key={id}><Actor img={actor.img} name={actor.name} /></li>;
      })}
    </ul>

    let listActor = (this.props.currentMovie == this.props.id) ? listActorHtml : <ul className='actor-list'></ul>

    return (
      <div>
        <p>{this.props.movie}</p>
        <img src={this.props.poster ? 'https://image.tmdb.org/t/p/w92' + this.props.poster : 'http://lorempixel.com/92/138/animals/'} />
        {listActor}
      </div>
    )

  }
}
export default Movie;