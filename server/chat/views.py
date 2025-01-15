from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import UserProfile, Chat
import json


def add_message_to_chat(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            chat_id = body.get("chat_id")
            message_content = body.get("message_content")
            chat = get_object_or_404(Chat, id=chat_id)
            chat.add_message(message_content)
            chat.save()
        except json.JSONDecodeError:
            print(json.JSONDecodeError)
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


def add_user_to_profile(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            clerk_user_id = body.get("clerk_user_id")
            if not clerk_user_id:
                return JsonResponse({"error": "clerk_user_id is required"}, status=400)

            profile, created = UserProfile.objects.get_or_create(
                clerk_user_id=clerk_user_id
            )

            return JsonResponse(
                {
                    "message": "User data stored",
                    "created": created,
                    "user_id": profile.id,
                }
            )
        except json.JSONDecodeError:
            print(json.JSONDecodeError)
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
