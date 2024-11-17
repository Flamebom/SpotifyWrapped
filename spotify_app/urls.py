from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path(
        'login/',
        views.spotify_login,
        name='spotify_login'),
    # Route to start Spotify login
    path(
        'callback/',
        views.spotify_callback,
        name='spotify_callback'),
    # Spotify OAuth callback
    path('profile/', views.spotify_profile, name='spotify_profile'),
]
