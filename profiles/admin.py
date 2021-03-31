from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import CustomUser,UserInfo


class CustomUserAdmin(UserAdmin):
    model = CustomUser


admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(UserInfo)
admin.site.unregister(Group)
