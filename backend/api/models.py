from django.conf import settings
from django.db import models


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # thumbnail = models.ImageField(upload_to="post_images", null=True)
    category = models.ForeignKey("Category", on_delete=models.CASCADE, null=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="post_likes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def number_of_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=100)


class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="comment_likes"
    )

    def number_of_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.post.title
