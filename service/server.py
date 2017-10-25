from flask import Flask
from flask_celery import make_celery
import urllib.request
import json

app = Flask(__name__)

app.config.update(
    CELERY_BROKER_URL='amqp://guest@localhost//',
    CELERY_BACKEND='rpc://'
)
celery = make_celery(app)


@celery.task(name='test_check')
def check(obj):
    if obj:
        return True
    else:
        return False

apiUrl = 'https://api.themoviedb.org/3/'
apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'

@app.route('/harry')
def get_movie():
    for i in range(100):
        with urllib.request.urlopen(apiUrl + 'search/movie' + apiKey + '&query=harry%20potter') as response:
            html = response.read().decode('utf-8')

        check.delay(json.dumps([html]))
    return 'Async request sent!'


if __name__ == '__main__':
    app.run(debug=True)
