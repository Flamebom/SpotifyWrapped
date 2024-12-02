from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.utils.translation import activate
import json
from .models import User, SpotifyWrapped
from django.shortcuts import redirect, render
from SpotifyWrapped.spotify_data import (
    get_auth_url,
    get_token,
    process_spotify_data,
)

from django.contrib.auth import login
from django import forms
from django.utils.timezone import now

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
    print(wrapped_list)
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

# Function to save the current time as a key and save a JSON response as the value
def save_json_response(request):
    if request.method == 'POST':
        # Assuming we receive a JSON response in the body
        response = json.loads(request.body)

        # Get the user (ensure they are logged in)
        user = request.user

        # Get the current time as the key
        current_time = now().strftime('%Y-%m-%d %H:%M:%S')

        # Create or update SpotifyWrapped entry with the user's data
        wrapped_entry, created = SpotifyWrapped.objects.get_or_create(
            user=user, year=2024  # Adjust as necessary
        )

        # Save the response data with the current time as the key
        wrapped_entry.save_json_response(current_time, response)

        return JsonResponse({'status': 'success', 'message': 'Data saved successfully'}, status=200)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

# Function to get all available keys (timestamps)
def get_all_keys(request):
    user = request.user
    wrapped_entries = SpotifyWrapped.objects.filter(user=user)

    all_keys = []
    for wrapped in wrapped_entries:
        all_keys.extend(wrapped.response_data.keys())

    return JsonResponse({'keys': list(set(all_keys))}, status=200)

# Function to get the value for a specific key
def get_value_for_key(request, key):
    user = request.user
    wrapped_entries = SpotifyWrapped.objects.filter(user=user)

    # Iterate through all entries and check if the key exists
    for wrapped in wrapped_entries:
        if key in wrapped.response_data:
            return JsonResponse({key: wrapped.response_data[key]}, status=200)

    return JsonResponse({'status': 'error', 'message': 'Key not found'}, status=404)
