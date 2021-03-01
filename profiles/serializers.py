from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from .models import CustomUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        # token['xyz'] = user.xyz
        return token



class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)
    password1 = serializers.CharField(min_length=8,write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password','password1')
        extra_kwargs = {'password': {'write_only': True},'password1': {'write_only': True}}

    def create(self, validated_data):
        username = validated_data.get('username',None)
        user_list = CustomUser.objects.filter(username=username)
        if(user_list.exists()):
            raise serializers.ValidationError({"Error-User":"User already Exists!"})

        password = validated_data.get('password', None)
        password1 = validated_data.pop('password1',None)

        if(password!=password1):
            raise serializers.ValidationError({"Error-Password":"Password do not Match!"})
        
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance




