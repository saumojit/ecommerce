# Generated by Django 4.1.5 on 2023-04-22 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0004_alter_order_options_alter_product_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="createdAt",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
