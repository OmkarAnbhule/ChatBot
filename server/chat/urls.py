# urls.py in the 'chat' app

from django.urls import path
from .views import add_user_to_profile, add_message_to_chat

urlpatterns = [
    path("store_user_data/", add_user_to_profile, name="add_user_to_profile"),
    path("message/", add_message_to_chat, name="add_message_to_chat"),
]
