from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import CustomTokenObtainPairSerializer,CustomUserSerializer
from .models import UserInfo
from modes.models import IdleClickerParameter,IdleClickerIndustry,SpecialModeIndustry,SpecialModeParameter


class CustomObtainTokenPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):        
        currency = request.data.get("currency",None)
        q1 = int(request.data.get("q1",0))
        q2 = int(request.data.get("q2",0))
        q3 = int(request.data.get("q3",0))
        q4 = int(request.data.get("q4",0))
        q5 = int(request.data.get("q5",0))
            
        email = request.data.get("email",None)

        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                try:
                    if(email):
                        user.email = email
                        user.save()
                except:
                    pass
                # Initial GDP Calculation
                gdp = q1+q2+q3+q4+q5
                net_gdp = (1-(0.05*gdp))*500000
                user_info,created = UserInfo.objects.get_or_create(
                    user=user,
                    currency=currency,
                    gdp = net_gdp
                )
                idleclicker_qs = IdleClickerIndustry.objects.all()
                for i in idleclicker_qs:
                    obj = IdleClickerParameter.objects.create(user=user_info,industry=i)
                
                specialmode_qs = SpecialModeIndustry.objects.all()
                for i in specialmode_qs:
                    obj = SpecialModeParameter.objects.create(user=user_info,industry=i)
                	
                data = serializer.data
                return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token",None)
            token = RefreshToken(refresh_token)
            token.blacklist()   
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)







