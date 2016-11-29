import React from 'react';
import { render } from 'react-dom';
import Actor from './Actor';
import Movie from './Movie';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.btn = document.querySelector('#send')
    this.list = document.getElementById('list')
    this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'
    this.apiUrl = 'https://api.themoviedb.org/3/'
    this.array = []
    this.arrayActors = []
    this.obj = {}

    this.state = {
      "result": [],
      'movieList': []
    }
    this.searchMovies = this.searchMovies.bind(this)
  }
  searchMovies(e) {
    e.preventDefault()
    this.getMovies(this.apiUrl + 'search/movie' + this.apiKey + '&query=harry%20potter')
      .then((movies) => {
        this.setState({ 'movieList': movies })
      })
  }
  searchCast(movieId) {

    this.getCast(movieId).then((casting) => {
      return this.saveActor(casting)
    }).then((result) => {
      console.log(result)
      this.setState({ "result": result })
    })
  }
  saveActor(casting) {

    return new Promise((resolve, reject) => {

      for (let i = 0; i < casting.length; i++) {
        this.obj = {
          "name": casting[i].name,
          "img": casting[i].profile_path
        }
        this.arrayActors.push(this.obj)

        setTimeout(() => {
          resolve(this.arrayActors)
        }, 0);

      }
    })
  }
  getCast(movieId) {

    let self = this
    return new Promise((resolve, reject) => {

      if (!movieId) {
        reject(new Error("no movie id"))
      }

      let url = ""
      let req = new XMLHttpRequest()

      url = self.apiUrl + 'movie/' + movieId + '/credits' + self.apiKey
      req.open('GET', url, true)

      req.onreadystatechange = function () {

        if (this.readyState === 4) {

          if (this.status === 200 && (JSON.parse(this.response).cast).length > 0) {

            for (let x = 0; x < (JSON.parse(this.response).cast).length; x++) {
              self.array.push(JSON.parse(this.response).cast[x])

              // need to wait the end of loop to resolve the promise
              setTimeout(() => {
                resolve(self.array)
              }, 0)

            }
          }
        }
      }
      req.send()
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
  getMovies(url) {
    var self = this
    return new Promise((resolve, reject) => {
      //request from query movie
      var httpRequest = new XMLHttpRequest()
      httpRequest.open('GET', url)

      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
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
        <form onSubmit={this.searchMovies}>
          <input type="text" placeholder='query' id="query" />
          <input type="submit" value="search" id="send" />
        </form>
        <ul>
          {this.state.movieList.map((movie, id) => {
            return <li onClick={this.searchCast.bind(this, movie.id)} key={id}><Movie movie={movie.original_title} /></li>;
          })}
        </ul>
        <ul>
          {this.state.result.map((resultValue, id) => {
            return <li key={id}><Actor img={resultValue.img} name={resultValue.name} /></li>;
          })}
        </ul>
      </div>)
  }
}
export default App;