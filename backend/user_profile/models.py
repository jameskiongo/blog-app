from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from django.db import models


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.email

    def save(self, *args, **kwargs):
        if not self.avatar_url:
            if SocialAccount.objects.filter(user=self.user).exists():
                social_account = SocialAccount.objects.get(user=self.user)
                self.avatar_url = social_account.extra_data.get("picture", "")

        super().save(*args, **kwargs)
