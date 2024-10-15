from django.urls import path

from . import views

urlpatterns = [
    path("<slug:slug>/", views.ProfileView.as_view(), name="profile"),
    path(
        "update/<slug:user__username>/",
        views.EditUserProfileView.as_view(),
        name="update_profile",
    ),
]
