from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path('api/users/',include("users.urls")),
    path('api/todo/',include("todo_api.urls")),
]
