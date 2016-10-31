import $ from 'jquery'

var app = {
  init() {
    const btn = document.querySelector('#send')
    const list = document.getElementById('list-result')
    this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'
    this.apiUrl = 'https://api.themoviedb.org/3/'
    this.array = []
    this.count = 0

    btn.addEventListener('click', () => {
      this.getCastMovies().then(() => {
        console.log('toutouyoutou')
      })
    })
  },
  getCastMovies() {

    var promiseA = this.movieApi(this.apiUrl + 'search/movie' + this.apiKey + '&query=harry%20potter')
    var promiseB = promiseA.then((movies) => {
      return this.getMovieId(movies)
    })
    var promiseC = promiseB.then((movieIds) => {
      return this.getCast(movieIds, this.callback)
    })

    return Promise.all([promiseA, promiseB, promiseC]).then((values) => {
      console.log('prom all', values)
    })
  },
  movieApi(url) {

    return new Promise(function (resolve, reject) {
      //request from query movie
      var httpRequest = new XMLHttpRequest()
      httpRequest.open('GET', url)

      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            //return list of movies
            resolve(JSON.parse(this.responseText).results)
          } else {
            console.log('reject list movies', this.status)
            reject(Error(this.statusText))
          }
        }
      }
      httpRequest.send()
    })
  },
  getMovieId(movies) {

    return new Promise(function (resolve, reject) {
      var arrayIds = []
      if (movies['Response'] === 'False') { } else {
        //create array of all id movies
        for (let index = 0; index < movies.length; index++) {
          arrayIds.push(movies[index].id)
        }
        resolve(arrayIds)
      }
    })
  },
  getActors(data) {
    console.log('getActors', data.length)
    for (let index = 0; index < data.length; index++) {
    }
  },
  callback(that, obj) {
    that.array.push(obj)

    if (obj === false) {
      console.log('array length', that.array.length)
      return that.getActors(that.array)
    }
  },
  getCast(movieIds, callback) {
    var self = this

    return new Promise(function (resolve, reject) {

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
}

module.exports = app;