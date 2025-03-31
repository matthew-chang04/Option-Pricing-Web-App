from __future__ import absolute_import, unicode_literals
import os
from stocks.stocks.celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stocks.settings')

app = Celery('stocks')
app.confic_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()