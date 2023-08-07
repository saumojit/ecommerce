# from django.template import Context
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings

def send_registration_mail(name , email):
    context={
        'name':name
    }
    email_subject="Onboarded to Proshop , Best Ecommerce Platform"
    email_body=render_to_string("registration_mail_body.txt" , context)
    email=EmailMessage(
        email_subject , email_body ,
        settings.DEFAULT_FROM_EMAIL , [email,]
    )
    return email.send(fail_silently=False)


# * To-Do * --> 1. Need to check if we can use other than "templates" folder