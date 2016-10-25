var app = {
  init() {
    const btn = document.querySelector('#send')
    btn.addEventListener('click', () => {
      this.callAPI().then((datas) => {
        console.log('datas', datas)

      }).catch(function () {
        console.log('errorrrrr')
      })
    })
  },
  callAPI() {
    return new Promise(function (resolve, reject) {

      let httpRequest = new XMLHttpRequest()
      httpRequest.open('GET', 'http://www.omdbfapi.com/?t=harry+potter')

      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            console.log('resolve', this)
            resolve(this.response)
          } else {
            console.log('reject')
            reject(Error(this.statusText))
          }
        }
      }
      httpRequest.send()

    })
  }
}

module.exports = app.init();