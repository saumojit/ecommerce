# Generated by Django 4.1.5 on 2023-05-18 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0011_order_status_review_review_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                blank=True,
                choices=[
                    ("PLACED", "PLACED"),
                    ("INPROGRESS", "INPROGRESS"),
                    ("PACKED", "PACKED"),
                    ("READYTOSHIP", "READYTOSHIP"),
                    ("SHIPPED", "SHIPPED"),
                    ("LOCALSHIPPED", "LOCALSHIPPED"),
                    ("OUTFORDELIVERY", "OUTFORDELIVERY"),
                    ("DELIVERED", "DELIVERED"),
                    ("DELIVERYDECLINED", "DELIVERYDECLINED"),
                    ("CANCELLED", "CANCELLED"),
                    ("RETURNED", "RETURNED"),
                    ("RETURNEDTOWAREHOUSE", "RETURNEDTOWAREHOUSE"),
                ],
                max_length=20,
                null=True,
            ),
        ),
    ]
