from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField  # Django 3.1+ supports JSONField
from django.db import models
from django.contrib.auth.models import (
    User,
)  # Assuming you use Django's built-in User model


class Chat(models.Model):
    room_name = models.CharField(max_length=255 , default="anonymous")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.room_name


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} in {self.chat}: {self.content[:30]}..."


class UserProfile(models.Model):
    clerk_user_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.clerk_user_id
