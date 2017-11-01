from lameufquijouedans import app
import lameufquijouedans.celery.tasks as t
import urllib.request
import json


@app.route('/')
def home():
    return "Welcome"

apiUrl = 'https://api.themoviedb.org/3/'
apiKey = '?api_key=148d9341acd58f310f70e4660a4a9add'

@app.route('/harry')
def get_movie():
    with urllib.request.urlopen(apiUrl + 'search/movie' + apiKey + '&query=harry%20potter') as response:
        html = response.read().decode('utf-8')

    t.check.delay(json.dumps([html]))

    # results = []
    # for i in range(0, 10):
    #     results.append(t.check.delay(json.dumps([html])))

    # return results
    return 'Async request sent'
