from django.urls import path
from . import views

urlpatterns=[
    path('my-todo/', views.TodoView.as_view()),
    path('my-todo/<slug:slug>', views.SignleTodo.as_view()),
]
