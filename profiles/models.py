from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """
    Custom User Model for Each User
    """
    pass


class UserInfo(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    currency = models.CharField(max_length=56,blank=True)
    gdp = models.BigIntegerField()

    def __str__(self):
        return f"User Info of {self.user.username}"

