from rest_framework import serializers
from todo_api.models import Todo


class TodoSer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        exclude = ("user", "id")

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user
        todo = Todo(user=user, **validated_data)
        todo.save()

        return todo
