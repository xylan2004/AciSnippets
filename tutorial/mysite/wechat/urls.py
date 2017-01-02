from django.conf.urls import url
from . import views

app_name = 'wechat'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^index$', views.index, name='index'),
    url(r'^info$', views.info, name='index'),
    url(r'^plan$', views.plan, name='index'),
    url(r'^my$', views.my, name='index'),
    url(r'^pcgeneral$', views.pcgeneral, name='index'),
]