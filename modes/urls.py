from django.urls import path

from . import views

urlpatterns=[
    path('list-sq/',views.ListSingleQuizQuestions.as_view()),
]