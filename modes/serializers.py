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
