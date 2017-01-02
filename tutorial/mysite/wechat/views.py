from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def info(request):
    return render(request, 'info.html')

def plan(request):
    return render(request, 'plan.html')

def my(request):
    return render(request, 'my.html')

def pcgeneral(request):
    return render(request, 'content/pc_general.html')