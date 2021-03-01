from django.urls import path
from django.conf.urls import url

from .views import index_view

urlpatterns = [
    path('', index_view),  # for the Empty Url
    url(r'^.*/$', index_view)  # for all Other Urls
]