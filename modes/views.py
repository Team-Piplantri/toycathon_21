from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
import random

from .models import SingleWordQuiz,SingleWordQuizAnswer
from .serializers import SingleWordQuizSerializer


class ListSingleQuizQuestions(APIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    def get(self,request,format=None):
        """
        Returns the List of Questions for Single Quiz
        """
        questions = SingleWordQuiz.objects.all()

        serializer = SingleWordQuizSerializer(questions,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)