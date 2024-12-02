from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
import json


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_dark_mode = models.BooleanField(default=True)  # default is dark mode
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class SpotifyWrapped(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    year = models.IntegerField()
    top_songs = models.TextField()  # Could store as JSON, list, or plain text
    top_artists = models.TextField()  # Similar to top_songs
    created_at = models.DateTimeField(auto_now_add=True)

    # We will add a new field to store JSON data
    response_data = models.JSONField(default=dict)

    def str(self):
        return f"{self.user.email}'s Spotify Wrapped for {self.year}"

    # Method to save JSON response data with the current time as the key
    def save_json_response(self, key, response):
        self.response_data[key] = response
        self.save()
