from lameufquijouedans.celery import celeryconfig
from celery import Celery

def make_celery(lmqjd):

    celery = Celery()
    celery.config_from_object(celeryconfig)

    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with lmqjd.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask

    return celery
