import traceback

from django.contrib.auth.models import User
from django.db.models.signals import pre_save ,post_save , post_delete
from django.dispatch import receiver

from .models import Account , Review , Product


@receiver(pre_save , sender=User) 
def updateEmail(sender , instance , **kwargs):
    user=instance
    if(user.email != ''):
        user.username=user.email


@receiver(post_save , sender=User)
def createAccount(sender ,instance , created, **kwargs):
    if(created):
        Account.objects.create(
            user=instance
            )


# ------------------------------------------ Unused File Deletion From File System ----------------------------------------------#
### R - Review Model -- Deletion Of Old Media Files

## Deletion Of Media Files From File System
@receiver(post_delete , sender=Review)
def delete_ImageFile_R(sender , instance , *args , **kwargs):
    try:
        print(instance.review_image)
        instance.review_image.delete(save=False)
    except Exception as e:
        #print(e)
        traceback.print_exc()

@receiver(post_delete , sender=Review)
def delete_File_R(sender , instance , *args , **kwargs):
    try:
        print(instance.review_video)
        instance.review_video.delete(save=False)
    except Exception as e:
        #print(e)
        traceback.print_exc()

## Deletion Of Media Files From File System and Replacement with New Files
@receiver(pre_save , sender=Review)
def delete_replace_ImageFile_R(sender , instance , *args , **kwargs):
    try:
        old_image=instance.__class__.objects.get(_id=instance._id).review_image
        old_path=old_image.path
        new_image=instance.review_image
        if(old_image.path!=new_image.path):
            print(f"Deleted Old Image File - {old_path}")
            old_image.delete(save=False)
    except Exception as e:
        traceback.print_exc()

@receiver(pre_save , sender=Review)
def delete_replace_File_R(sender , instance , *args , **kwargs):
    try:
        old_file=instance.__class__.objects.get(_id=instance._id).review_video
        old_path=old_file.path
        new_file=instance.review_video
        if(old_file.path!=new_file.path):
            print(f"Deleted Old Media (Video) File - {old_path}")
            old_file.delete(save=False)
    except Exception as e:
        traceback.print_exc()



### A - Account Model -- Deletion Of Old Media Files

## Deletion Of Media Files From File System
@receiver(post_delete , sender=Account)
def delete_ImageFile_A(sender , instance , *args , **kwargs):
    try:
        print(instance.account_profile_image)
        instance.account_profile_image.delete(save=False)
    except Exception as e:
        #print(e)
        traceback.print_exc()

## Deletion Of Media Files From File System and Replacement with New Files
@receiver(pre_save , sender=Account)
def delete_replace_ImageFile_A(sender , instance , *args , **kwargs):
    try:
        old_image=instance.__class__.objects.get(_id=instance._id).account_profile_image
        old_path=old_image.path
        new_image=instance.account_profile_image
        if(old_image.path!=new_image.path):
            print(f"Deleted Old Image File - {old_path}")
            old_image.delete(save=False)
    except Exception as e:
        traceback.print_exc()



### P - Product Model -- Deletion Of Old Media Files

## Deletion Of Media Files From File System
@receiver(post_delete , sender=Product)
def delete_ImageFile_P(sender , instance , *args , **kwargs):
    try:
        print(instance.image)
        instance.image.delete(save=False)
    except Exception as e:
        #print(e)
        traceback.print_exc()

## Deletion Of Media Files From File System and Replacement with New Files
@receiver(pre_save , sender=Product)
def delete_replace_ImageFile_P(sender , instance , *args , **kwargs):
    try:
        old_image=instance.__class__.objects.get(_id=instance._id).image
        old_path=old_image.path
        new_image=instance.image
        if(old_image.path!=new_image.path):
            print(f"Deleted Old Image File - {old_path}")
            old_image.delete(save=False)
    except Exception as e:
        traceback.print_exc()









