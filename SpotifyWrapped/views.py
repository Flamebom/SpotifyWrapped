from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.utils.translation import activate

from .models import User
from django.shortcuts import redirect, render
from SpotifyWrapped.spotify_data import (
    get_auth_url,
    get_token,
    process_spotify_data,
)


def register_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = User.objects.create_user(email=email, password=password)
        login(request, user)
        return redirect('home')  # for registration redirect
    return render(request, '../UI/SpotifyUI/register.html')


def logout_view(request):
    logout(request)
    return redirect('login')


def delete_account_view(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        return redirect('login')  # for redirect to login post-account deletion
    return render(request, 'delete_account.html')


def toggle_dark_mode(request):
    user = request.user
    user.is_dark_mode = not user.is_dark_mode  # Toggle the boolean field
    user.save()
    # Return the new state
    return JsonResponse({'is_dark_mode': user.is_dark_mode})


def login_view(request):
    return render(request, '../UI/SpotifyUI/login.html')


def spotify_auth(request):
    return redirect(get_auth_url())


def profile_view(request):
    """This method renders the profile page.

    Returns the user's profile page.
    """
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, '../UI/SpotifyUI/login.html',
                          {'error': 'Invalid credentials'})
    access_token = request.session.get('access_token')
    if not access_token:
        return redirect('login')

    context = process_spotify_data(access_token)
    return render(request, '../UI/SpotifyUI/profile.html', context)


def reset(request):
    """This method allows the user to reset their password.

    Returns the reset password page.
    """
    return render(request, '../UI/SpotifyUI/resetpassword.html', {})

def language_toggle(request):
    """
    Change the application's language and reload the current page.
    """
    # Get the language from the POST request
    lang_code = request.POST.get('language', 'en')  # Default to English if none is selected

    # Activate the selected language
    activate(lang_code)

    # Save the language in the session for persistence
    request.session['django_language'] = lang_code

    # Redirect back to the page the user was on
    return redirect(request.META.get('HTTP_REFERER', '/'))
def spotify_callback(request):
    """Handle Spotify callback and retrieve access token."""
    code = request.GET.get('code')
    if not code:
        return HttpResponse('No code provided in the callback.')
    access_token, error = get_token(code)
    if error:
        return HttpResponse(f"Failed to get token: {error}")
    request.session['access_token'] = access_token
    return redirect('profile')
