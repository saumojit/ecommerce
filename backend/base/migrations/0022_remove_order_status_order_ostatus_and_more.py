# Generated by Django 4.1.5 on 2023-05-25 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0021_alter_shippinglist_availability"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="order",
            name="status",
        ),
        migrations.AddField(
            model_name="order",
            name="ostatus",
            field=models.CharField(
                blank=True,
                choices=[
                    ("PLACED", "PLACED"),
                    ("INPROGRESS", "INPROGRESS"),
                    ("PACKED", "PACKED"),
                    ("READYTOSHIP", "READYTOSHIP"),
                    ("INTRANSIT", "INTRANSIT"),
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
        migrations.AddField(
            model_name="orderitem",
            name="oitem_status",
            field=models.CharField(
                blank=True,
                choices=[
                    ("WAREHOUSE_PACKED", "WAREHOUSE_PACKED"),
                    ("WAREHOUSE_OUT", "WAREHOUSE_OUT"),
                    ("WAREHOUSE_REPLACED", "WAREHOUSE_REPLACED"),
                    ("WAREHOUSE_RETURNED", "WAREHOUSE_RETURNED"),
                ],
                max_length=200,
                null=True,
            ),
        ),
    ]
