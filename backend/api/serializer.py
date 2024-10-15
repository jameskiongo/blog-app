from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from user_profile.models import Profile

from .models import Comment, Post


class CommentSerializer(ModelSerializer):
    likes = serializers.SerializerMethodField("number_of_likes")
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user_details = serializers.SerializerMethodField("get_user")
    user_avatar = serializers.SerializerMethodField("get_user_avatar")

    class Meta:
        model = Comment
        fields = [
            "id",
            "post",
            "content",
            "user",
            "user_details",
            "user_avatar",
            "likes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at", "likes", "post"]

    def number_of_likes(self, obj):
        return obj.number_of_likes()

    def get_user(self, obj):
        user = obj.user
        return {
            "id": user.id,
            "username": user.username,
        }

    def get_user_avatar(self, obj):
        try:
            return obj.user.profile.avatar_url
        except Profile.DoesNotExist:
            return None


class PostSerializer(ModelSerializer):
    category = ModelSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField("number_of_likes")
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user_details = serializers.SerializerMethodField("get_user")
    comments = CommentSerializer(many=True, read_only=True)
    user_avatar = serializers.SerializerMethodField("get_user_avatar")

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "content",
            "user",
            "user_details",
            "category",
            "user_avatar",
            "likes",
            "created_at",
            "updated_at",
            "comments",
        ]

    def create(self, validated_data):
        return Post.objects.create(**validated_data)

    def number_of_likes(self, obj):
        return obj.number_of_likes()

    def get_user(self, obj):
        user = obj.user
        return {
            "id": user.id,
            "username": user.username,
        }

    def get_user_avatar(self, obj):
        try:
            return obj.user.profile.avatar_url
        except Profile.DoesNotExist:
            return None


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "name"]
