from django.urls import path

from . import views

urlpatterns=[
    # Single Quiz Endpoints
    path('list-sq/',views.ListSingleQuizQuestionsView.as_view()), # Only GET
    path('answer-sq/',views.AnswerSingleQuizQuestionView.as_view()), # GET and POST

    # Multiple Quiz Endpoints
    path('list-mq/',views.ListMultipleQuizView.as_view()), # Only GET
    path('answer-mq/',views.AnswerMultipleQuizView.as_view()), # GET and POST

    #ChanBot
    path('chan-quote/',views.ChanBotView.as_view()), # Only GET

    #IdleClicker
    path('idle-clicker-industry/<int:sector>/',views.IdleClickerIndustryView.as_view()), # Only GET
    path('idle-clicker-params/',views.IdleClickerParameterView.as_view()), # GET and POST

    #SpecialMode
    path('specialmode-industry/<int:sector>/',views.SpecialModeIndustryView.as_view()), # Only GET
    path('specialmode-params/',views.SpecialModeParameterView.as_view()), # GET and POST
]