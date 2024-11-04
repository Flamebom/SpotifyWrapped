from django.contrib import admin
from django.urls import path
from . import views

app_name = 'SpotifyWrapped'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('delete_account/', views.delete_account_view, name='delete_account'),
    path('toggle-dark-mode/', views.toggle_dark_mode, name='toggle_dark_mode')
]
