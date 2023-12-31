# Generated by Django 4.1.5 on 2023-05-23 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0020_alter_shippinglist_availability"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shippinglist",
            name="availability",
            field=models.CharField(
                blank=True,
                choices=[("8-22", "8am to 10 pm"), ("10-18", "10am to 6 pm")],
                max_length=10,
                null=True,
            ),
        ),
    ]
