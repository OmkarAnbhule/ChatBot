import json
import uuid
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Chat, Message


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = str(uuid.uuid4())
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_content = text_data_json["message"]
        user_id = text_data_json.get("user_id")  # Optional: Pass user ID from frontend

        # Store message in the database
        chat = Chat.objects.get_or_create(room_name=self.room_name)[
            0
        ]  # Use room_name to find chat
        Message.objects.create(chat=chat, user_id=user_id, content=message_content)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {"type": "chat.message", "message": message_content, "user_id": user_id},
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]
        message = message.upper()

        # Send message to WebSocket
        self.send(
            text_data=json.dumps(
                {"message": message, "user_id": event.get("user_id", "Anonymous")}
            )
        )
