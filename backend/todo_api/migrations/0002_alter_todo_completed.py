# Generated by Django 5.0.6 on 2024-05-16 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("todo_api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="todo",
            name="completed",
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
