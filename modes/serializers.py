from rest_framework import serializers

from . import models

class SingleWordQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SingleWordQuiz
        fields = '__all__'


class SingleWordQuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SingleWordQuizAnswer
        fields = '__all__'


class MultipleQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MultipleQuiz
        fields = '__all__'


class MultipleQuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MultipleQuizAnswer
        fields = '__all__'


class ChanBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChanBot
        fields = '__all__'