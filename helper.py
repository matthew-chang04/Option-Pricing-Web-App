# This is NOT to be run, it is setup for the periodic updating of stock prices, will be run once to initialize the project

from django_celery_beat.models import PeriodicTask, IntervalSchedule
from datetime import timedelta
import json

schedule, created = IntervalSchedule.objects.get_or_create(
    every=1,
    period = IntervalSchedule.DAYS
)

PeriodicTask.objects.create(
    interval=schedule,
    name="Updating Closing Price",
    task='stocks.task.update_stock_close',
    args=json.dumps([]) # put any needed arguments here
)