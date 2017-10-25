from celery import Celery

app = Celery()

app.config_from_object('celeryconfig')

@app.task
def sort_object(obj):
    print('celery_task: sort_object')
    return obj
