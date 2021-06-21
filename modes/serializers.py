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


class IdleClickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IdleClickerIndustry
        fields = '__all__'


class IdleClickerParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IdleClickerParameter
        fields = '__all__'


class SpecialModeIndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SpecialModeIndustry
        fields = '__all__'


class SpecialModeParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SpecialModeParameter
        fields = '__all__' 