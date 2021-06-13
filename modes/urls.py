from django.urls import path

from . import views

urlpatterns=[
    path('list-sq/',views.ListSingleQuizQuestionsView.as_view()),
    path('answer-sq/',views.AnswerSingleQuizQuestionView.as_view()),    
]