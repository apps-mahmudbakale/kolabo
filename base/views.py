from django.http import HttpResponse
from django.shortcuts import render, redirect


def main(request):
    return render(request, 'base/main.html')

def app(request):
    return render(request, 'base/app.html')

