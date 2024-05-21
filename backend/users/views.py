from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, status
from rest_framework.views import Response
from rest_framework import generics
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.contrib.auth.models import User
from users.serializers import SignInSer, SignUpSer, UserSer


class APIRoot(APIView):
    """Generation Metadata about the root path"""

    name = "Users Root Url"
    description = "Manage Sign(in-up-out), Access Tokens"
    endpoints = ["sign-up", "sign-in", "auth", "sign-out"]

    def get(self, request):
        """Getting the default meta added added with {name, description, endpoint}"""
        meta = self.metadata_class()
        data = meta.determine_metadata(request, self)
        data["endpoints"] = self.endpoints
        return Response(data)


class SignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignUpSer
    throttle_classes = [UserRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = Token.objects.get(user=user)
            response = {"token": token.key, "user": UserSer(user).data}
            return Response(response, status=status.HTTP_201_CREATED)

        except IntegrityError:
            trigger = {"error": "Username already taken"} # db error
            return Response(trigger, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


class SignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignInSer
    throttle_classes = [UserRateThrottle]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user = User.objects.get(
                email=serializer.validated_data.get("email"))

            if user.check_password(serializer.validated_data.get("password")):
                token, created = Token.objects.get_or_create(user=user)

                response = {"token": token.key, "user": UserSer(user).data}
                return Response(response)

            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except User.DoesNotExist:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_404_NOT_FOUND,
            )


class SignOut(APIView):
    throttle_classes = [AnonRateThrottle]

    def logout(self, request):
        try:
            request.user.auth_token.delete()
        # anon User
        except AttributeError:
            pass
        return Response(
            {"success": "Successfully logged out."}, status=status.HTTP_200_OK
        )

    def post(self, request):
        return self.logout(request)


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        query = get_object_or_404(User, id=user.id)
        serializer_class = UserSer(query)
        return Response(serializer_class.data)
