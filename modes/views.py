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
        ind_weight_prim=[0.35,0.25,0.2,0.1,0.1]

        ind_weight_sec=[0.3,0.15,0.15,0.1,0.3]

        ind_weight_tert=[0.45,0.2,0.1,0.05,0.2]

        param_wt_prim=[0.35,0.3,0.15,0.2]

        param_wt_sec=[0.3,0.35,0.15,0.2]

        param_wt_tert=[0.25,0.15,0.35,0.25]

        sector_wt=[0.12,0.28,0.6]

        unit_ind_wt_list=[]
        query_list = SpecialModeParameter.objects.filter(user=request.user.info)

        for i in range(0,len(ind_weight_prim)):
            unit_ind_wt=0
            unit_ind_wt+=((param_wt_prim[0]*(query_list[i].slider1))+(param_wt_prim[1]*(query_list[i].slider2))+(param_wt_prim[2]*(query_list[i].slider3))+(param_wt_prim[3]*(query_list[i].slider4)))
            unit_ind_wt_list.append(unit_ind_wt*ind_weight_prim[i])

        for i in range(0,len(ind_weight_sec)):
            unit_ind_wt=0
            unit_ind_wt+=((param_wt_sec[0]*(query_list[i+5].slider1))+(param_wt_sec[1]*(query_list[i+5].slider2))+(param_wt_sec[2]*(query_list[i+5].slider3))+(param_wt_sec[3]*(query_list[i+5].slider4)))
            unit_ind_wt_list.append(unit_ind_wt*ind_weight_sec[i])

        for i in range(0,len(ind_weight_tert)):
            unit_ind_wt=0
            unit_ind_wt+=((param_wt_tert[0]*(query_list[i+10].slider1))+(param_wt_tert[1]*(query_list[i+10].slider2))+(param_wt_tert[2]*(query_list[i+10].slider3))+(param_wt_tert[3]*(query_list[i+10].slider4)))
            unit_ind_wt_list.append(unit_ind_wt*ind_weight_tert[i])

        total_score=0
        for i in range(3):
            sector_sum=0
            for j in range(5):
                sector_sum+=unit_ind_wt_list[(5*i)+j]
            total_score+=(sector_sum*sector_wt[i])

        stars = 0
        if(total_score<2500):
            stars = 0
        elif(total_score>=2500 and total_score<3000):
            stars = 1
        elif(total_score>=3000 and total_score<3500):
            stars = 2
        elif(total_score>=3500 and total_score<4000):
            stars = 3
        elif(total_score>=4000 and total_score<4500):
            stars = 4
        elif(total_score>=4500):
            stars = 5

        total_score = round(total_score*100,2)

        return Response(data={"value":total_score,'stars':stars},status=status.HTTP_200_OK)

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




