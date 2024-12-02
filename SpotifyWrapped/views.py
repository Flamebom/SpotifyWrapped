from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.utils.translation import activate

from .models import User, SpotifyWrapped
from django.shortcuts import redirect, render
from SpotifyWrapped.spotify_data import (
    get_auth_url,
    get_token,
    process_spotify_data,
)

from django.contrib.auth import login
from django import forms
from django.utils.timezone import localtime

class UserRegistrationForm(forms.Form):
    email = forms.EmailField(label="Email", max_length=255)
    password = forms.CharField(label="Password", widget=forms.PasswordInput)


def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = User.objects.create_user(email=email, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = UserRegistrationForm()
    return render(request, 'SpotifyUI/register.html', {'form': form})


def register_view_old(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = User.objects.create_user(email=email, password=password)
        login(request, user)
        return redirect('home')  # for registration redirect
    return render(request, '../UI/SpotifyUI/register.html')


def create_wrapped_list(user):
    wrapped_times = []
    wrapped_entries = SpotifyWrapped.objects.filter(user=user)

    for wrapped in wrapped_entries:
        creation_time = wrapped.created_at
        wrapped_times.append(creation_time)

    return wrapped_times


def logout_view(request):
    logout(request)
    return redirect('login')


def delete_account_view(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        return redirect('login')  # for redirect to login post-account deletion
    return render(request, '../UI/SpotifyUI/login.html')


def toggle_dark_mode(request):
    user = request.user
    user.is_dark_mode = not user.is_dark_mode  # Toggle the boolean field
    user.save()
    # Return the new state
    return JsonResponse({'is_dark_mode': user.is_dark_mode})


def view_wrapped(request):
    wrapped_list = SpotifyWrapped.objects.filter(
        user=request.user).order_by('-year')
    return render(request, '../UI/SpotifyUI/account.html',
                  {'wrapped_list': wrapped_list})


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

    return render(request, '../UI/SpotifyUI/mainhome.html')


def account_view(request):
    return render(request, '../UI/SpotifyUI/account.html')


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
    # Default to English if none is selected
    lang_code = request.POST.get('language', 'en')

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
    access_token = request.session.get('access_token')

    request.session['context'] = process_spotify_data(access_token)
    return redirect('profile')


def pages_view(request, page_num):
    pages = {
        1: "../UI/SpotifyUI/story2slide1.html",
        2: "../UI/SpotifyUI/story2slide2.html",
        3: "../UI/SpotifyUI/story2slide3.html",
        4: "../UI/SpotifyUI/story2slide4.html",
        5: "../UI/SpotifyUI/story2slide5.html",
        6: "../UI/SpotifyUI/story2slide6.html",
        7: "../UI/SpotifyUI/story2slide7.html",
        8: "../UI/SpotifyUI/story2slide8.html"
    }
    template = pages.get(page_num, "error.html")
    if page_num == 1 or page_num == 8:
        return render(request, template, {})
    else:
        # print(request.session.get('context'))
        return render(request, template, request.session.get('context'))
