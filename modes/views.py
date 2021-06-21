from django.shortcuts import render,get_object_or_404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
import random

from .models import SingleWordQuiz,SingleWordQuizAnswer,MultipleQuiz,MultipleQuizAnswer,ChanBot,IdleClickerIndustry,IdleClickerParameter
from .serializers import *


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


class ChanBotView(APIView):

    def get(self,request,format=None):
        """
        Returns Random Quote of Chanakya
        """
        quote_list = ChanBot.objects.all()
        quote_object = random.choice(quote_list)
        serializer = ChanBotSerializer(quote_object)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class IdleClickerIndustryView(APIView):

    def get(self,request,sector,format=None):
        """
        Returns the List of Industries
        """
        industry_list = IdleClickerIndustry.objects.filter(sector=sector)
        serializer = IdleClickerSerializer(industry_list,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class IdleClickerParameterView(APIView):

    def get(self,request,format=None):
        """
        Returns the Parameters List
        """
        parameters_list = IdleClickerParameter.objects.filter(user=request.user.info)
        data = {}
        for i in parameters_list:
            temp = IdleClickerParameterSerializer(i)
            data[i.industry.id] = temp.data
        return Response(data=data,status=status.HTTP_200_OK)

    def post(self,request,format=None):
        industryParamsId = request.data.get('industryParamsId')
        buyAmount = int(request.data.get('buyAmount'))
        param_obj = get_object_or_404(IdleClickerParameter,pk=industryParamsId)
        param_obj.current_quantity += buyAmount
        param_obj.quantity_bought = buyAmount

        current_one_buy = param_obj.next_one_buy
        param_obj.next_one_buy = (current_one_buy*1.1)
        param_obj.next_ten_buy = (current_one_buy*11)
        param_obj.next_hundred_buy = (current_one_buy*110)

        unit_industry_income = param_obj.industry.unit_industry_income
        param_obj.industry_income += (unit_industry_income+buyAmount)

        if(param_obj.managed):
            pass

        param_obj.save()
        return Response(data={"Success":"Params Updated"},status=status.HTTP_200_OK)
        


