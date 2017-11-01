# lameufquijouedans
Find actor who played in a movie

## Backend
### start rabbit MQ
`rabbitmq-server`

### init app (to do once)
`sudo sh init_app.sh`

### start python Flask server
`flask run`

### start celery consumer task
`cd /celery`

`celery -A tasks:celery worker --loglevel=info`

### call the task via Flask route
`http://localhost:5000/harry`

## Frontend
`npm i`

### launch watch builder
`npm run watch`

### launch webpack server
`npm run serve`

#### keywords
- webpack
- React
- ES6
- sass

#### Repo / Helper
- https://github.com/bensmithett/webpack-css-example

#### TODO
- add tv
- catch errors
- trier results
