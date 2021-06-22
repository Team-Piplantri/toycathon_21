from django.shortcuts import render,get_object_or_404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
import random
from itertools import chain

from .models import SingleWordQuiz,SingleWordQuizAnswer,MultipleQuiz,MultipleQuizAnswer,ChanBot,IdleClickerIndustry,IdleClickerParameter,SpecialModeIndustry,SpecialModeParameter
from .serializers import *


class ListSingleQuizQuestionsView(APIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    def get(self,request,format=None):
        """
        Returns the List of Questions for Single Quiz
        """
        questions_easy = SingleWordQuiz.objects.filter(difficulty=1)
        random_ques_easy = random.choices(questions_easy,k=5)

        questions_medium = SingleWordQuiz.objects.filter(difficulty=2)
        random_ques_med = random.choices(questions_medium,k=3)

        questions_hard = SingleWordQuiz.objects.filter(difficulty=3)
        random_ques_hard = random.choices(questions_hard,k=2)

        final_list = list(chain(random_ques_easy, random_ques_med, random_ques_hard))

        serializer = SingleWordQuizSerializer(final_list,many=True)
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
        questions_easy = MultipleQuiz.objects.filter(difficulty=1)
        random_ques_easy = random.choices(questions_easy,k=5)

        questions_medium = MultipleQuiz.objects.filter(difficulty=2)
        random_ques_med = random.choices(questions_medium,k=3)

        questions_hard = MultipleQuiz.objects.filter(difficulty=3)
        random_ques_hard = random.choices(questions_hard,k=2)

        final_list = list(chain(random_ques_easy, random_ques_med, random_ques_hard))

        serializer = MultipleQuizSerializer(final_list,many=True)
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
        """
        Updates the instance of Industry Parameter of User
        """
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


class SpecialModeIndustryView(APIView):

    def get(self,request,sector,format=None):
        """
        Returns the List of Industries
        """
        sector = int(sector)
        industry = SpecialModeIndustry.objects.get(front_end_id=sector)
        industry_param = SpecialModeParameter.objects.get(user=request.user.info,industry=industry)
        serializer = SpecialModeParameterSerializer(industry_param)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class SpecialModeParameterView(APIView):

    def get(self,request,format=None):
        """
        Returns the Score
        """
        # w11 = 0.35
        # w12 = 0.3
        # w13 = 0.15
        # w14 = 0.2

        # w21 = 0.3
        # w22 = 0.35
        # w23 = 0.15
        # w24 = 0.2

        # w31 = 0.25
        # w32 = 0.35
        # w33 = 0.15
        # w34 = 0.25

        # sum_slider_11 = 0
        # sum_slider_12 = 0
        # sum_slider_13 = 0
        # sum_slider_14 = 0

        # sum_slider_21 = 0
        # sum_slider_22 = 0
        # sum_slider_23 = 0
        # sum_slider_24 = 0

        # sum_slider_31 = 0
        # sum_slider_32 = 0
        # sum_slider_33 = 0
        # sum_slider_34 = 0

        # query_list = SpecialModeParameter.objects.filter(user=request.user)
        # for i in query_list:
        #     if(i.industry.sector==1):
        #         sum_slider_11+=((i.slider1)*w11)
        #         sum_slider_12+=((i.slider2)*w12)
        #         sum_slider_13+=((i.slider3)*w13)
        #         sum_slider_14+=((i.slider4)*w14)
        #     if(i.industry.sector==2):
        #         sum_slider_21+=((i.slider1)*w21)
        #         sum_slider_22+=((i.slider2)*w22)
        #         sum_slider_23+=((i.slider3)*w23)
        #         sum_slider_24+=((i.slider4)*w24)
        #     if(i.industry.sector==3):
        #         sum_slider_31+=((i.slider1)*w31)
        #         sum_slider_32+=((i.slider2)*w32)
        #         sum_slider_33+=((i.slider3)*w33)
        #         sum_slider_34+=((i.slider4)*w34)
        
        # industry_list = SpecialModeIndustry.objects.all()
        # for i in industry_list:
        #     if(i.sector==1):
        #         pass
        #     if(i.sector==2):
        #         pass
        #     if(i.sector==3):
        #         pass


        return Response(data={"value":"100"},status=status.HTTP_200_OK)

    def post(self,request,format=None):
        """
        Saves the Updated Options
        """
        option = int(request.data['option'])
        value = int(request.data['value'])
        industry = int(request.data['industry'])

        industry_obj = SpecialModeIndustry.objects.get(front_end_id=industry)
        industry_param = SpecialModeParameter.objects.get(user=request.user.info,industry=industry_obj)
        if(option==1):
            industry_param.slider1 = value
        elif(option==2):
            industry_param.slider2 = value
        elif(option==3):
            industry_param.slider3 = value
        elif(option==4):
            industry_param.slider4 = value
        
        industry_param.save()

        return Response(data={"Success":"Params Updated"},status=status.HTTP_200_OK)




