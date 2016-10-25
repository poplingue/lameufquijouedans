var app = {
  init() {
    const btn = document.querySelector('#send')
    btn.addEventListener('click', () => {
      this.imdbApi().then((data) => {
        this.checkData(data).then((data) => {
          console.log('ret0', data)
        }).catch((err) => {
          console.log('catch0', err)
        })
      }).catch((err) => {
        console.log('catch1', err)
      })
    })
  },
  imdbApi() {
    return new Promise(function (resolve, reject) {

      let httpRequest = new XMLHttpRequest()
      httpRequest.open('GET', 'http://www.omdbapi.com/?t=harry+potter')

      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            console.log('resolve')
            resolve(JSON.parse(this.responseText))
          } else {
            console.log('reject', this.status)
            reject(Error(this.statusText))
          }
        }
      }
      httpRequest.send()

    })
  },
  checkData(data) {
    console.log('checkData', data)
    return new Promise(function (resolve, reject) {
      if (data['Response'] === 'False') {
        reject(Error('aucune réponse'))
      } else {
        resolve(data)
      }
    })
  }
}

module.exports = app.init();