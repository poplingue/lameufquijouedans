BROKER_URL = 'amqp://guest:guest@127.0.0.1:5672//'
CELERY_BACKEND = 'sqlite:///Users/pgc/Documents/database_files/filestorage.db'

# CELERY_RESULT_BACKEND = 'db+mysql://poplingue:VBWfHlksa24T9k9n@127.0.0.1:3306/tasks'
# CELERY_ROUTES = {'queue0': {'queue': 'queue_test0'}}
# CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
# CELERY_ACCEPT_CONTENT = ['json']

