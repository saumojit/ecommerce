# Generated by Django 4.1.5 on 2023-04-04 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_product_image"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="order",
            options={"ordering": ["-createdAt"]},
        ),
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, default="/placeholder.png", null=True, upload_to=""
            ),
        ),
    ]
