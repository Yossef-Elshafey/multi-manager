from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from todo_api.models import Todo
from todo_api.serializers import TodoSer


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.user:
            return True
        if request.method in SAFE_METHODS:
            return True
        return False

class TodoView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Todo.objects.select_related("user").all()
    serializer_class = TodoSer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = self.get_queryset().filter(user=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SignleTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.select_related("user").all()
    serializer_class = TodoSer
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    lookup_field = "slug"

    def get_object(self):
        path = self.kwargs[self.lookup_field]
        obj = get_object_or_404(self.get_queryset(), slug=path)

        # get_object by default doesn't check permissions
        self.check_object_permissions(self.request,obj)
        return obj
