from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import CustomTokenObtainPairSerializer,CustomUserSerializer


class CustomObtainTokenPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                data = serializer.data
                return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        # try:
        refresh_token = request.data.get("refresh_token",None)
        token = RefreshToken(refresh_token)
        token.blacklist()   
        return Response(status=status.HTTP_205_RESET_CONTENT)
        # except Exception as e:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)


#DEMO VIEW
class HelloWorldView(APIView):
    # permission_classes = (permissions.AllowAny,)
    
    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)






