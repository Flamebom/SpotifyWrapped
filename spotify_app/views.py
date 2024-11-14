from django.shortcuts import redirect, render
from django.http import HttpResponse
from .spotify_data import (
    get_auth_url,
    get_token,
    process_spotify_data,
)


def spotify_login(request):
    """Redirect user to Spotify login page."""
    return redirect(get_auth_url())


def spotify_callback(request):
    """Handle Spotify callback and retrieve access token."""
    code = request.GET.get('code')
    if not code:
        return HttpResponse('No code provided in the callback.')
    access_token, error = get_token(code)
    if error:
        return HttpResponse(f"Failed to get token: {error}")
    request.session['access_token'] = access_token
    return redirect('spotify_profile')


def spotify_profile(request):
    """Display user profile with detailed Spotify data."""
    access_token = request.session.get('access_token')
    if not access_token:
        return redirect('spotify_login')

    context = process_spotify_data(access_token)

    return render(request, 'spotify_app/profile.html', context)


def home(request):
    """Render the home page."""
    return render(request, 'spotify_app/home.html')
