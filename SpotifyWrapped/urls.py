from django.urls import path
from . import views

app_name = 'SpotifyWrapped'
urlpatterns = [
    path('', views.login, name='login'),
    path('login.html', views.login, name='login'),
    path('profile/', views.profile, name='profile'),
    path('profile.html', views.profile, name='profile'),
    path('register/', views.register, name='register'),
    path('register.html', views.register, name='register'),
    path('reset/', views.reset, name='reset'),
    path('resetpassword.html', views.reset, name='reset'),
    path('toggle-dark-mode/', views.toggle_dark_mode, name='toggle_dark_mode'),
    path('admin/', admin.site.urls),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('delete_account/', views.delete_account_view, name='delete_account'),
    path('toggle-dark-mode/', views.toggle_dark_mode, name='toggle_dark_mode')
]
