from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")


class SignUpSer(serializers.ModelSerializer):
    password_compare = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
        validators=[
            UniqueValidator(queryset=User.objects.all(),
                            message="email exists")
        ]
    )

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "password",
            "password_compare",
        ]
        extra_kwargs = {
            "id": {"read_only": True},
        }

    def validate_password(self, value):
        if len(value) <= 6:
            raise ValidationError("Password cannot be less than or equal 6")

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["password_compare"]:
            raise ValidationError({"password": "passowrd did not match"})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        user.set_password(password)
        user.save()
        return user


class SignInSer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
