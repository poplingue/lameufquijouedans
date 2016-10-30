var app = {
  init() {
    const btn = document.querySelector('#send')
    const list = document.getElementById('list-result')
    this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'
    this.apiUrl = 'https://api.themoviedb.org/3/'
    this.array = []

    btn.addEventListener('click', () => {
      this.results().then(() => {
        console.log('after all')
      })

    })
  },
  results() {

    var a = this.movieApi(this.apiUrl + 'search/movie' + this.apiKey + '&query=harry%20potter')
    var b = a.then((movies) => {
      console.log('b')
      return this.getMovieId(movies)
    })
    var c = b.then((movieIds) => {
        console.log('c')
        return this.getCast(movieIds, this.callback)
      })
      // var d = c.then((data) => {
      //   return this.getActors(data)
      // })

    return Promise.all([a, b, c]).then(function (values) {
      console.log('promise all', values)
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
            console.log('resolve list movies')
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
      if (movies['Response'] === 'False') {} else {
        //create array of all id movies
        for (let index = 0; index < movies.length; index++) {
          arrayIds.push(movies[index].id)
        }
        resolve(arrayIds)
      }
    })
  },
  getActors(data) {

    for (let index = 0; index < data.length; index++) {

      for (let k = 0; k < data[index].length; k++) {
        console.log('id', data[index][k].id)

      }
    }
  },
  callback(that, data) {
    if (data) {
      that.array.push(data)
    } else {
      return that.array
    }
  },
  getCast(movieIds, callback) {
    var self = this
    this.array = []
    this.count = 0
    return new Promise(function (resolve, reject) {

      var url = ""
      var req = []
      var count = 0

      for (var i = 0; i < movieIds.length; i++) {

        req[i] = new XMLHttpRequest()
        url = self.apiUrl + 'movie/' + movieIds[i] + '/credits' + self.apiKey
        req[i].open('GET', url)
        self.count++

          console.log('self.count', self.count)
        req[i].onreadystatechange = function () {

          if (this.readyState === 4) {
            if (this.status === 200 && JSON.parse(this.response).cast.length > 0) {

              for (var x = 0; x < (JSON.parse(this.response).cast).length; x++) {
                callback(self, JSON.parse(this.response).cast[x]);

                if (self.count === movieIds.length) {
                  console.log('resolve')
                  resolve(callback(self))
                }

              }
            }
          }
        }
        req[i].send()
      }
    })
  }
};

module.exports = app.init();