import React from 'react';
import Movie from './Movie';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'
        this.apiUrl = 'https://api.themoviedb.org/3/'
        this.array = []
        this.arrayActors = []
        this.obj = {}

        this.state = {
            movieList: [],
            actorList: [],
            search: "",
            currentMovie: null,
            ready: false,
            value: ""
        }

        this.searchMovies = this.searchMovies.bind(this)
    }

    searchMovies(e) {
        e.preventDefault()

        let search = (e.type === 'submit') ? this.state.search : e.target.value
        this.setState({search: search, value: e.target.value})

        this.query = this.transformValueToQuery(search)

        this.getMovies(this.apiUrl + 'search/movie' + this.apiKey + '&query=' + this.query)
            .then((movies) => {
                this.setState({movieList: movies})
            }).catch((err) => {
            console.log(err)
        })
    }

    transformValueToQuery(value) {
        let c = ''
        let a = []
        for (let i = 0; i < value.length; i++) {
            c = (value[i] === ' ') ? '%20' : value[i]
            a.push(c)
        }
        return a.join('')
    }

    searchCast(movieId, id) {

        this.getCast(movieId).then((casting) => {
            return this.updateArrayActors(casting)
        }).then((actorList) => {
            this.setState({currentMovie: id, actorList: actorList})
        })

        this.appStep('actor')

    }

    updateArrayActors(casting) {

        return new Promise((resolve, reject) => {
            let arrayActors = []
            let obj = {}

            for (let i = 0; i < casting.length; i++) {
                obj = {
                    "name": casting[i].name,
                    "img": casting[i].profile_path
                }
                arrayActors.push(obj)

                if (casting.length === arrayActors.length) {
                    resolve(arrayActors)
                    return
                }
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
            self.array = []

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

    getMovies(url) {
        var self = this
        return new Promise((resolve, reject) => {

            if (this.query) {
                //request from value movie
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
            } else {
                this.appStep(null)
                // reject('write something')
            }
        })
    }

    appStep(e) {

        if(!e){
            document.getElementById('wrap-container').className = ''
            this.setState({movieList: [],actorList: []})
            return
        }

        if(e == 'actor'){
            document.getElementById('wrap-container').className = 'step-actor'
        }

        if (e.type == 'blur' && this.state.value == '') {
            document.getElementById('wrap-container').className = ''
        } else if(e.type == 'focus') {
            document.getElementById('wrap-container').className = 'step-movie'
        }
    }

    render() {

        return (
            <div id="wrap-form">
              <form onSubmit={this.searchMovies}>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder='The host, Billy Elliot...'
                    id="value"
                    value={this.state.value}
                    onChange={(e)=>this.searchMovies(e)}
                    onFocus={(e) => this.appStep(e)}
                    onBlur={(e) => this.appStep(e)}/>
                <input type="submit" value="" id="send"/>
              </form>
              <ul className='movie-list'>
                  {this.state.movieList.map((movie, id) => {
                      return <li onClick={this.searchCast.bind(this, movie.id, id)} key={id}>
                        <Movie
                            id={id}
                            currentMovie={this.state.currentMovie}
                            poster={movie.poster_path}
                            movie={movie.original_title}
                            actorList={this.state.actorList}/>
                      </li>;
                  })}
              </ul>
            </div>)
    }
}

export default App;
