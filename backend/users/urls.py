from django.urls import path
from . import views

urlpatterns = [
    path("", views.APIRoot.as_view()),
    path("me", views.UserInfo.as_view()),
    path("sign-up", views.SignUp.as_view()),
    path("sign-in", views.SignIn.as_view()),
    path("sign-out", views.SignOut.as_view()),
]
