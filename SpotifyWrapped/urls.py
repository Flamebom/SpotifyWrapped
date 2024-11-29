"""
URL configuration for SpotifyWrapped project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

app_name = 'SpotifyWrapped'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.login_view, name='home'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile.html/', views.profile_view, name='profile'),
    path('delete_account/', views.delete_account_view, name='delete_account'),
    path('toggle-dark-mode/', views.toggle_dark_mode, name='toggle_dark_mode'),
    path('spotify-auth/', views.spotify_auth, name='spotify_auth'),
    path('callback/', views.spotify_callback, name='callback'),
    path('stats/', views.stats_view, name='stats'),
]
