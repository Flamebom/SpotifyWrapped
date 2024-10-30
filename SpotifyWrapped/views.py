from django.shortcuts import render

# Renders
def index(request):
    """Render the index page (login on startup)."""
    return render(request, '../UI/SpotifyUI/login.html', {})

def profile(request):
    """Render the profile page (after login)."""
    return render(request, '../UI/profile.html', {})