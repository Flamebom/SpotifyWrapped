from django.shortcuts import render

def login(request):
    """This method renders the index page.

    Returns the login page.
    """
    return render(request, '../UI/SpotifyUI/login.html', {})

def profile(request):
    """This method renders the profile page.

    Returns the user's profile page.
    """
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