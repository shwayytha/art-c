# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-19 02:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('micro', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='lon',
            new_name='latitude',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='lat',
            new_name='longtitude',
        ),
    ]
