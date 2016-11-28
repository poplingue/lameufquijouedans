import React from 'react';
import { render } from 'react-dom';
import Actor from './Actor';

class ActorList extends React.Component {
  constructor(props) {
    super(props)
    this.btn = document.querySelector('#send')
    this.list = document.getElementById('list')
    this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'
    this.apiUrl = 'https://api.themoviedb.org/3/'
    this.array = []
    this.count = 0
    this.indexLoop = 0
    this.arrayActors = []
    this.obj = {}

    this.state = {
      "result": []
    }
    this.launchSearch = this.launchSearch.bind(this)
  }
  launchSearch(e) {

    e.preventDefault()
    this.getCastMovies().then((result) => {
      console.log('toutouyoutou')
      this.setState({ "result": result })
    })
  }
  getCastMovies() {

    var promiseA = this.movieApi(this.apiUrl + 'search/movie' + this.apiKey + '&query=snatch')
    var promiseB = promiseA.then((movies) => {
      return this.getMovieId(movies)
    })

    var promiseC = promiseB.then((movieIds) => {
      return this.getCast(movieIds)
    })
    var promiseD = promiseC.then((actor) => {
      return this.actorFilterDouble(actor)
    })
    var promiseE = promiseD.then((list) => {
      //return this.splitListMaxRequest(list)
      //}).then((list) => {
      return this.actorListObjRequest(list, this.saveActor)
    })

    return Promise.all([promiseA, promiseB, promiseC, promiseD, promiseE]).then((values) => {
      return values[4]
    }).catch((err) => {
      console.log('catch all', err.message)
    })
  }
  splitListMaxRequest(list) {
    return new Promise((resolve, reject) => {
      resolve(list)
    })
  }
  saveActor(that, obj, list, id) {
    //push img & name of actor in array
    that.obj = {
      "name": obj.name,
      "img": obj.profile_path
    }
    that.arrayActors.push(that.obj)

    //delete id from listIds when request ok
    list.forEach((item, index, object) => {
      if (item === id) {
        object.splice(index, 1);
      }
    })

  }
  actorListObjRequest(listIds, saveActor, updateList) {
    //make array of objects with name & url image for each actor

    var self = this
    return new Promise((resolve, reject) => {
      let url = ""
      let actorsList = []
      let req = []

      for (let u = 0; u < listIds.length; u++) {
        url = this.apiUrl + 'person/' + listIds[u] + this.apiKey
        req[u] = new XMLHttpRequest()

        req[u].open('GET', url, true)

        req[u].onreadystatechange = function () {

          if (this.readyState === 4 && this.status === 200) {
            self.indexLoop++
            if (self.indexLoop === 40) {
              resolve(self.arrayActors)
              return
            } else {
              saveActor(self, JSON.parse(this.response), listIds, listIds[u])
            }

            if (self.indexLoop === listIds.length) {
            }
          }
        }
        req[u].send()
      }
    })
  }
  valueExist(array, id) {
    //return value if not yet in array
    if (array.length === 0) {
      return id
    }
    for (var j = 0; j < array.length; j++) {
      if (id === array[j]) {
        return null
      }
      if (j === (array.length - 1)) {
        return id
      }
    }
  }
  actorFilterDouble(actorObj) {
    return new Promise((resolve, reject) => {
      if (actorObj.length === 0) {
        reject(new Err('no result'))
      }
      let array = []
      let currentIdActor = null
      let i = 1

      while (i < actorObj.length) {
        currentIdActor = this.valueExist(array, actorObj[i].id)
        if (currentIdActor !== null) {
          array.push(currentIdActor)
        }
        i++
      }
      resolve(array)

    })
  }
  getCast(movieIds) {
    //get casting of each movie
    var self = this
    return new Promise((resolve, reject) => {

      if (movieIds.length === 0) {
        reject(new Error("no result"))
      }

      let url = ""
      let req = []

      for (var i = 0; i < movieIds.length; i++) {

        req[i] = new XMLHttpRequest()
        url = self.apiUrl + 'movie/' + movieIds[i] + '/credits' + self.apiKey
        req[i].open('GET', url, true)

        req[i].onreadystatechange = function () {

          if (this.readyState === 4) {
            self.count++

            if (this.status === 200 && (JSON.parse(this.response).cast).length > 0) {

              for (var x = 0; x < (JSON.parse(this.response).cast).length; x++) {

                self.array.push(JSON.parse(this.response).cast[x])

                if (self.count === movieIds.length) {
                  resolve(self.array)
                  return
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
          {this.state.result.map(function (resultValue, id) {
            return <li key={id}><Actor img={resultValue.img} name={resultValue.name} /></li>;
          })}
        </ul>
      </div>)
  }
}
export default ActorList;