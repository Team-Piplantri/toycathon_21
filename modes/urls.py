from django.urls import path

from . import views

urlpatterns=[
    # Single Quiz Endpoints
    path('list-sq/',views.ListSingleQuizQuestionsView.as_view()), # Only GET
    path('answer-sq/',views.AnswerSingleQuizQuestionView.as_view()), # GET and POST

    # Multiple Quiz Endpoints
    path('list-mq/',views.ListMultipleQuizView.as_view()), # Only GET
    path('answer-mq/',views.AnswerMultipleQuizView.as_view()), # GET and POST
]