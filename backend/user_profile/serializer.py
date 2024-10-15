from rest_framework import serializers

from .models import Profile


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Profile
        fields = ["id", "username", "avatar_url", "bio"]
        read_only_fields = ["id"]

        def update(self, instance, validated_data):
            user = self.context["request"].user
            if user != instance.user:
                raise serializers.ValidationError(
                    {"detail": "You do not have permission to perform this action"}
                )
            instance.avatar_url = validated_data.get("avatar_url", instance.avatar_url)
            instance.bio = validated_data.get("bio", instance.bio)
            instance.save()
            return instance
