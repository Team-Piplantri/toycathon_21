# Generated by Django 3.1.7 on 2021-06-22 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modes', '0007_auto_20210622_0856'),
    ]

    operations = [
        migrations.AddField(
            model_name='multiplequiz',
            name='difficulty',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='singlewordquiz',
            name='difficulty',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='chanbot',
            name='quote',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='multiplequiz',
            name='explanation',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='multiplequiz',
            name='option1',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='multiplequiz',
            name='option2',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='multiplequiz',
            name='option3',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='multiplequiz',
            name='option4',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='multiplequiz',
            name='ques_text',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='singlewordquiz',
            name='explanation',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='singlewordquiz',
            name='ques_text',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
    ]
