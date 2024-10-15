from django.shortcuts import get_object_or_404, render
from rest_framework.exceptions import NotFound, PermissionDenied, ValidationError
from rest_framework.generics import RetrieveAPIView  # RetrieveUpdateAPIView,
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Profile
from .permissions import IsOwner
from .serializer import UserProfileSerializer


class ProfileView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        username = self.kwargs["slug"]
        return get_object_or_404(Profile, user__username=username)


class EditUserProfileView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    queryset = Profile.objects.all()
    lookup_field = "user__username"

    def get_object(self):
        # Retrieve the profile based on the username from the URL slug
        profile = get_object_or_404(
            Profile, user__username=self.kwargs["user__username"]
        )
        if profile.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this profile.")

        return profile
