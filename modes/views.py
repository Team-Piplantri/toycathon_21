from django.shortcuts import render,get_object_or_404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
import random

from .models import SingleWordQuiz,SingleWordQuizAnswer,MultipleQuiz,MultipleQuizAnswer
from .serializers import SingleWordQuizSerializer,SingleWordQuizAnswerSerializer,MultipleQuizSerializer,MultipleQuizAnswerSerializer


class ListSingleQuizQuestionsView(APIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    def get(self,request,format=None):
        """
        Returns the List of Questions for Single Quiz
        """
        questions = SingleWordQuiz.objects.all()
        serializer = SingleWordQuizSerializer(questions,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class AnswerSingleQuizQuestionView(APIView):

    def get(self,request,format=None):
        """
        Returns the List of Questions for Auth User
        """
        answers = SingleWordQuizAnswer.objects.filter(user=request.user.info)
        serializer = SingleWordQuizAnswerSerializer(answers,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


    def post(self,request,format=None):
        """
        Saves the Answer for Particular Question
        """
        id_ = request.data.get('questionID')
        selected_answer = request.data.get('answer')
        ques_obj = get_object_or_404(SingleWordQuiz,pk=id_)
        answer_obj,created = SingleWordQuizAnswer.objects.get_or_create(user=request.user.info,quiz_ques=ques_obj)
        answer_obj.selected_answer = selected_answer
        answer_obj.save()
        serializer = SingleWordQuizAnswerSerializer(answer_obj)
        return Response(data=serializer.data,status=status.HTTP_201_CREATED)


class ListMultipleQuizView(APIView):

    def get(self,request,format=None):
        """
        Returns the List of Questions for Multiple Quiz
        """
        questions = MultipleQuiz.objects.all()
        serializer = MultipleQuizSerializer(questions,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class AnswerMultipleQuizView(APIView):

    def get(self,request,format=None):
        """
        Returns the List of Questions for Auth User
        """
        answers = MultipleQuizAnswer.objects.filter(user=request.user.info)
        serializer = MultipleQuizAnswerSerializer(answers,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    

    def post(self,request,format=None):
        """
        Saves the Answer for Particular Question
        """
        id_ = request.data.get('questionID')
        selected_answer = request.data.get('answer')
        ques_obj = get_object_or_404(MultipleQuiz,pk=id_)
        answer_obj,created = MultipleQuizAnswer.objects.get_or_create(user=request.user.info,quiz_ques=ques_obj)
        answer_obj.selected_answer = selected_answer
        answer_obj.save()
        serializer = MultipleQuizAnswerSerializer(answer_obj)
        return Response(data=serializer.data,status=status.HTTP_201_CREATED)

