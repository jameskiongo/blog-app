from allauth.account.views import ConfirmEmailView
from django.urls import include, path, re_path

from .views import GoogleLogin, GoogleLoginCallback, LoginPage

urlpatterns = [
    re_path(
        "^register/account-confirm-email/(?P<key>[-:\w]+)/$",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    path("", include("dj_rest_auth.urls")),
    path("register/", include("dj_rest_auth.registration.urls")),
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
]
