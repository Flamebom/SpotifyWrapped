from django.shortcuts import render, redirect
from django.utils.translation import activate, get_language
from .translations import translations
from django.shortcuts import redirect
from django.utils.translation import activate

def home_view(request):
    """
    Render the homepage with dynamically translated content based on the selected language.
    """
    # Get the current active language (default is 'en')
    lang_code = get_language()

    # Fetch translations for the active language
    context = {
        'welcome_message': translations['welcome_message'].get(lang_code, translations['welcome_message']['en']),
        'top_songs_message': translations['top_songs_message'].get(lang_code, translations['top_songs_message']['en']),
    }

    return render(request, 'home.html', context)

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
