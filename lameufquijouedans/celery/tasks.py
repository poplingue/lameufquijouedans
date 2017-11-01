from lameufquijouedans import app
from flask import Flask
from lameufquijouedans.celery.flask_celery import make_celery

# app.config.update(
#     CELERY_BROKER_URL='amqp://guest@localhost//',
#     CELERY_BACKEND='db+mysql://tasks:root@localhost:3306/tasks'
# )

# app.config.update(celeryconfig)

celery = make_celery(app)

@celery.task(name='test_check')
def check(obj):
    print('toutouyoutou')
    if obj:
        return True
    else:
        return False

@celery.task(name='test_bool')
def bool(obj):
    if obj:
        return 1
    else:
        return 0
