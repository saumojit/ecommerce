from __future__ import absolute_import  , unicode_literals
from celery import shared_task
from celery.utils.log import get_task_logger
from .utils.Email_Manager import send_registration_mail


logger= get_task_logger(__name__)

@shared_task
def send_registration_mail_task(name , email):
    logger.info('Registration Mail Sent To User.')
    return send_registration_mail(name , email) , email
