# Generated by Django 4.1.5 on 2023-05-18 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0013_alter_accountlevelshippinginfo_address_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="wishlist",
            name="wtitle",
            field=models.CharField(
                blank=True, default="default", max_length=20, null=True
            ),
        ),
    ]
