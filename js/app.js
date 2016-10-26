var app = {
  init() {
    const btn = document.querySelector('#send')
    const list = document.getElementById('list-result')
    this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'
    this.apiUrl = 'https://api.themoviedb.org/3/'


    btn.addEventListener('click', () => {
      //get input value and request IMDB

      this.movieApi(this.apiUrl + 'search/movie' + this.apiKey + '&query=harry%20potter').then((movies) => {
        return this.getMovieId(movies)
      }).then((movieIds) => {
        return this.getCast(movieIds)
      }).then((data) => {
        return this.getActors(data)
      }).catch((err) => {

      })
    })
  },
  movieApi(url) {

    return new Promise(function (resolve, reject) {
      //request from query movie
      let httpRequest = new XMLHttpRequest()
      let getUrl = url
      httpRequest.open('GET', getUrl)

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

    if (movies['Response'] === 'False') {

    } else {
      this.arrayIds = []
      //create array of all id movies
      for (let index = 0; index < movies.length; index++) {
        this.arrayIds.push(movies[index].id)
      }
      return this.arrayIds
    }
  },
  getActors(data) {

    for (let index = 0; index < data.length; index++) {

      for (let k = 0; k < data[index].length; k++) {
        console.log('id', data[index][k].id)

      }
    }

  },
  getCast(movieIds) {

    var array = []
    for (let i = 0; i < movieIds.length; i++) {
      let getUrl = this.apiUrl + 'movie/' + movieIds[i] + '/credits' + this.apiKey
      let httpRequest = new XMLHttpRequest()

      httpRequest.open('GET', getUrl)

      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200 && JSON.parse(this.response).cast.length > 0) {

            for (let x = 0; x < (JSON.parse(this.response).cast).length; x++) {
              array.push(JSON.parse(this.response).cast[x])
            }
          }
        }
        console.log('array', array.length)
      }
      httpRequest.send()
    }
    return array
  }
}

module.exports = app.init();