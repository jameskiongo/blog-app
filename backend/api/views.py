# from django.http import Http404
# from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Comment, Post
from .permissions import IsOwner
from .serializer import CommentSerializer, PostSerializer


class PostView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        post = Post.objects.all()
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class SinglePostView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class EditPostView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner, IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentView(ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post_id = self.kwargs.get("pk")
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise ValidationError({"detail": "Post does not exist"})
        serializer.save(user=self.request.user, post=post)

    def get_queryset(self):
        post_id = self.kwargs.get("pk")
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise ValidationError({"detail": "Post does not exist"})
        return Comment.objects.filter(post=post_id)


class EditCommentView(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
