import React from 'react';
import { render } from 'react-dom';
import Actor from './Actor';

class ActorList extends React.Component {
  constructor() {
    super()
    this.btn = document.querySelector('#send');
    this.list = document.getElementById('list');
    this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add';
    this.apiUrl = 'https://api.themoviedb.org/3/';
    this.array = [];
    this.count = 0;
    this.launchSearch = this.launchSearch.bind(this);
  }
  launchSearch(e) {

    e.preventDefault()
    this.getCastMovies().then(() => {
      console.log('toutouyoutou')
    })
  }
  getCastMovies() {

    var promiseA = this.movieApi(this.apiUrl + 'search/movie' + this.apiKey + '&query=potter')
    var promiseB = promiseA.then((movies) => {
      return this.getMovieId(movies)
    })

    var promiseC = promiseB.then((movieIds) => {
      return this.getCast(movieIds, this.callback)
    })
    var promiseD = promiseC.then((actor) => {
      return this.actorFilter(actor)
    })

    return Promise.all([promiseA, promiseB, promiseC, promiseD]).then((values) => {
      console.log('prom all', values)
    }).catch((err) => {
      console.log('catch all', err.message)
    })
  }
  valueExist(array, newValue) {
    //return value if not yet in array
    //array.forEach(function (item) {
    for (var index = 0; index <= array.length; index++) {
      console.log('item', item)
      if (newValue === item) {
        return false
      } else {
        return newValue
      }
    }
    //})
  }
  actorFilter(actorObj) {

    var self = this
    return new Promise((resolve, reject) => {

      var array = []
      array.push(actorObj[0].id)
      console.log('test', self.valueExist(array, 5049))

      for (let i = 0; i < actorObj.length; i++) {

        let currentIdActor = self.valueExist(array, actorObj[i].id)
        if (currentIdActor === false) {
          console.log('test', !self.valueExist(array, currentIdActor), currentIdActor)
          array.push(currentIdActor)
        }
        resolve(actorObj)
      }
    })
  }
  callback(that, obj) {

    that.array.push(obj)
    if (obj === false) {
      return
    }
  }
  getCast(movieIds, callback) {
    var self = this
    return new Promise((resolve, reject) => {

      if (movieIds.length === 0) {
        reject(new Error("no result"))
      }

      var url = ""
      var req = []

      for (var i = 0; i < movieIds.length; i++) {

        req[i] = new XMLHttpRequest()
        url = self.apiUrl + 'movie/' + movieIds[i] + '/credits' + self.apiKey
        req[i].open('GET', url, true)

        req[i].onreadystatechange = function () {

          if (this.readyState === 4) {

            self.count++

            if (this.status === 200 && (JSON.parse(this.response).cast).length > 0) {

              for (var x = 0; x < (JSON.parse(this.response).cast).length; x++) {

                if (self.count === movieIds.length) {
                  callback(self, false)
                  resolve(self.array)
                  return
                } else {
                  callback(self, JSON.parse(this.response).cast[x])
                }
              }
            }
          }
        }
        req[i].send()
      }
    })
  }
  getMovieId(movies) {

    return new Promise((resolve, reject) => {
      var arrayIds = []

      if (movies.length === 0) {
        reject(new Error("aucun résulat"))
      } else {
        //create array of all id movies
        for (let index = 0; index < movies.length; index++) {
          arrayIds.push(movies[index].id)
        }
        resolve(arrayIds)
      }
    })
  }
  movieApi(url) {

    return new Promise((resolve, reject) => {
      //request from query movie
      var httpRequest = new XMLHttpRequest()
      httpRequest.open('GET', url)

      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            //return list of movies
            resolve(JSON.parse(this.responseText).results)
          } else {
            reject(new Error("status response : " + this.status))
          }
        }
      }
      httpRequest.send()
    })
  }
  render() {

    return (
      <div>
        <form onSubmit={this.launchSearch}>
          <input type="text" placeholder='query' id="query" />
          <input type="submit" value="search" id="send" />
        </form>
        <ul>
          <li><Actor /></li>
        </ul>
      </div>)
  }
}
export default ActorList;