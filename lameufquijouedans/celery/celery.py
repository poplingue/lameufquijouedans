BROKER = 'amqp://guest:guest@127.0.0.1:5672//'
CELERY_RESULT_BACKEND = 'db+mysql://tasks:root@localhost:3306/tasks'
BACKEND = 'db+mysql://tasks:root@localhost:3306/tasks'
# CELERY_ROUTES = {'queue0': {'queue': 'queue_test0'}}
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_ACCEPT_CONTENT = ['json']
