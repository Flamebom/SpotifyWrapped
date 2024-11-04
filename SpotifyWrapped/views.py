from django.shortcuts import render


def login(request):
 """Render the index page (login on startup)."""
    return render(request, '../UI/SpotifyUI/login.html', {})


def profile(request):
    """Render the profile page (after login)."""
    return render(request, '../UI/SpotifyUI/profile.html', {})

def register(request):
    """This method allows the user to register for Spotify.

    Returns the Spotify register page.
    """
    return render(request, '../UI/SpotifyUI/register.html', {})

def reset(request):
    """This method allows the user to reset their password.

    Returns the reset password page.
    """
    return render(request, '../UI/SpotifyUI/resetpassword.html', {})