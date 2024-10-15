from django.urls import path

from . import views

urlpatterns = [
    path("posts/", views.PostView.as_view(), name="posts"),
    path("post/<int:pk>/", views.EditPostView.as_view(), name="edit_post"),
    path("posts/<int:pk>/", views.SinglePostView.as_view(), name="edit_post"),
    path("post/<int:pk>/comment/", views.CommentView.as_view(), name="comment"),
    path("comment/<int:pk>/", views.EditCommentView.as_view(), name="edit_post"),
]
