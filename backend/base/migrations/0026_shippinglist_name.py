# Generated by Django 4.1.5 on 2023-07-03 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0025_alter_review_review_video"),
    ]

    operations = [
        migrations.AddField(
            model_name="shippinglist",
            name="name",
            field=models.CharField(default="", max_length=25),
        ),
    ]
