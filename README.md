# Backend
start rabbit MQ
`rabbitmq-server`

start python Flask server
`python3 server.py`

start celery consumer task
`celery -A server.celery worker --loglevel=debug`

call the task via Flask route
`http://localhost:5000/harry`

# lameufquijouedans
Find actor who played in a movie

`npm i`

## launch watch builder
`npm run watch`

## launch webpack server
`npm run serve`

### keywords
- webpack
- React
- ES6
- sass

### Repo / Helper
- https://github.com/bensmithett/webpack-css-example

### TODO
- add tv
- catch errors
- trier results
