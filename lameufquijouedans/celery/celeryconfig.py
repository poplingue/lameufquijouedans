BROKER_URL = 'amqp://guest@localhost//'
CELERY_RESULT_BACKEND = 'db+mysql://tasks:root@localhost:3306/tasks'
# CELERY_ROUTES = {'queue0': {'queue': 'queue_test0'}}
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_ACCEPT_CONTENT = ['json']
