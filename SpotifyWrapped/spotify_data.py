from GeminiAPI.GeminiAPI import gemini_api_request
import requests
import base64
from django.conf import settings
from urllib.parse import urlencode
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"


def get_auth_url():
    """Construct the Spotify authorization URL with the required scopes."""
    params = {
        'client_id': settings.SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
        'scope': 'user-top-read user-library-read playlist-read-private user-read-recently-played',
    }
    return f"{SPOTIFY_AUTH_URL}?{urlencode(params)}"


def get_token(code):
    """Exchange authorization code for access token."""
    auth_header = base64.b64encode(
        f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}".encode()).decode()
    headers = {"Authorization": f"Basic {auth_header}"}
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI
    }
    response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=data)
    if response.status_code != 200:
        return None, response.text
    access_token = response.json().get('access_token')
    return access_token, None


def get_spotify_data(endpoint, access_token, params=None):
    """Helper function to interact with the Spotify API."""
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(
        f"{SPOTIFY_API_BASE_URL}/{endpoint}",
        headers=headers,
        params=params)
    if response.status_code != 200:
        return {}
    return response.json()


def get_user_profile(access_token):
    """Retrieve the user's Spotify profile information."""
    return get_spotify_data("me", access_token)


def get_user_top_tracks(access_token, time_range='long_term', limit=5):
    """Retrieve the user's top tracks."""
    return get_spotify_data(
        "me/top/tracks",
        access_token,
        params={
            'limit': limit,
            'time_range': time_range})


def get_user_top_artists(access_token, time_range='long_term', limit=5):
    """Retrieve the user's top artists."""
    return get_spotify_data(
        "me/top/artists",
        access_token,
        params={
            'limit': limit,
            'time_range': time_range})


def get_artist_top_tracks(artist_id, access_token, country='US'):
    """Retrieve an artist's top tracks."""
    return get_spotify_data(
        f"artists/{artist_id}/top-tracks",
        access_token,
        params={
            'country': country})


def get_user_playlists(access_token, limit=5):
    """Retrieve the user's playlists."""
    return get_spotify_data(
        "me/playlists",
        access_token,
        params={
            'limit': limit})


def get_user_saved_albums(access_token, limit=5):
    """Retrieve the user's saved albums."""
    return get_spotify_data("me/albums", access_token, params={'limit': limit})


def get_recently_played(access_token, limit=50):
    """Retrieve the user's recently played tracks."""
    return get_spotify_data(
        "me/player/recently-played",
        access_token,
        params={
            'limit': limit})


def process_spotify_data(access_token):
    """Fetch and process all Spotify data needed for the profile view."""
    tracks_data = []
    artists_data = []
    playlists_data = []
    albums_data = []
    top_genres = []
    listening_habits = {}
    total_listening_time = 0
    total_recently_played_time = 0

    # User profile information
    user_profile = get_user_profile(access_token)
    user_name = user_profile.get('display_name', 'User')

    # Top tracks for long term
    top_tracks_long_term = get_user_top_tracks(
        access_token, time_range='long_term', limit=5)

    if top_tracks_long_term.get('items'):
        # Total listening time for top tracks
        total_listening_time = sum(
            track['duration_ms'] for track in top_tracks_long_term.get(
                'items', [])) // 1000  # Convert to seconds

        # Top tracks data
        for track in top_tracks_long_term.get('items', []):
            duration_seconds = track['duration_ms'] // 1000
            minutes = duration_seconds // 60
            seconds = duration_seconds % 60
            track_info = {
                "id": track['id'],
                "name": track['name'],
                "artist": ', '.join(
                    artist['name'] for artist in track['artists']),
                "duration": duration_seconds,
                "minutes": minutes,
                "seconds": seconds,
                "album_cover": track['album']['images'][0]['url'] if track['album']['images'] else None,
            }
            tracks_data.append(track_info)

    # Top artists (long term)
    top_artists_long_term = get_user_top_artists(
        access_token, time_range='long_term', limit=5)

    genres_count = {}
    if top_artists_long_term.get('items'):
        for artist in top_artists_long_term.get('items', []):
            artist_info = {
                "id": artist['id'],
                "name": artist['name'],
                "image": artist['images'][0]['url'] if artist['images'] else None,
                "genres": artist.get(
                    'genres',
                    []),
            }
            # Top track of the artist
            top_track_data = get_artist_top_tracks(artist['id'], access_token)
            if top_track_data.get('tracks'):
                top_track = top_track_data['tracks'][0]
                artist_info['top_track_name'] = top_track.get('name')
            else:
                artist_info['top_track_name'] = None
            artists_data.append(artist_info)
            # Count genres
            for genre in artist.get('genres', []):
                genres_count[genre] = genres_count.get(genre, 0) + 1

    # Sort genres by count in descending order and get top 5 genres
    sorted_genres = sorted(
        genres_count.items(),
        key=lambda x: x[1],
        reverse=True)
    top_genres = [genre for genre, count in sorted_genres[:5]]

    # Listening habits over different time ranges
    time_ranges = {
        'Last 4 weeks': 'short_term',
        'Last 6 months': 'medium_term',
        'All time': 'long_term'
    }
    for label, time_range in time_ranges.items():
        # Top tracks
        top_tracks = get_user_top_tracks(
            access_token, time_range=time_range, limit=5)
        tracks = [
            {
                "name": track['name'],
                "artist": ', '.join(artist['name'] for artist in track['artists']),
                "album_cover": track['album']['images'][0]['url'] if track['album']['images'] else None,
            }
            for track in top_tracks.get('items', [])
        ]
        listening_habits[label] = {
            'tracks': tracks,
        }

    # User's playlists
    playlists = get_user_playlists(access_token, limit=5)
    if playlists.get('items'):
        for playlist in playlists.get('items', []):
            playlist_info = {
                "name": playlist['name'],
                "image": playlist['images'][0]['url'] if playlist['images'] else None,
                "tracks_total": playlist['tracks']['total'],
                "id": playlist['id'],
            }
            playlists_data.append(playlist_info)

    # User's saved albums
    saved_albums = get_user_saved_albums(access_token, limit=5)
    if saved_albums.get('items'):
        for item in saved_albums.get('items', []):
            album = item['album']
            album_info = {
                "name": album['name'],
                "artist": ', '.join(
                    artist['name'] for artist in album['artists']),
                "image": album['images'][0]['url'] if album['images'] else None,
                "release_date": album['release_date'],
            }
            albums_data.append(album_info)

    # Recently played tracks for total listening time approximation
    recently_played = get_recently_played(access_token, limit=50)
    if recently_played.get('items'):
        total_recently_played_time = sum(
            item['track']['duration_ms'] for item in recently_played.get(
                'items', [])) // 1000  # Convert to seconds

    # Total minutes listened
    total_minutes_listened = (
        total_listening_time + total_recently_played_time) // 60  # Convert to minutes

    # Top track name
    if tracks_data:
        top_track_name = tracks_data[0]['name']
    else:
        top_track_name = None

    # Top track plays (Placeholder)
    top_track_plays = "many"

    # New artist count
    new_artist_count = len(
        top_artists_long_term.get(
            'items',
            [])) if top_artists_long_term.get('items') else 0

    # Top genre count
    top_genre_count = len(top_genres)

    # Listening Personality Type
    if new_artist_count >= 20:
        listening_personality_type = f"You’re The Discoverer, always on the hunt for new music! You found {new_artist_count} new artists this year."
    elif top_genre_count > 5:
        listening_personality_type = "You’re The Genre Enthusiast, exploring a diverse range of music!"
    else:
        listening_personality_type = "You have a unique listening style!"

    # Most played genre
    if top_genres:
        top_genre = top_genres[0]
    else:
        top_genre = None

    # Genre minutes (Placeholder)
    genre_minutes = "many"

    # Top artist name
    if artists_data:
        top_artist_name = artists_data[0]['name']
    else:
        top_artist_name = None

    # Total listening times
    total_listening_minutes = total_listening_time // 60
    total_listening_seconds = total_listening_time % 60

    total_recently_played_minutes = total_recently_played_time // 60
    total_recently_played_seconds = total_recently_played_time % 60

    # Context for the template
    context = {
        'user_name': user_name,
        'tracks_data': tracks_data,
        'artists_data': artists_data,
        'top_genres': top_genres,
        'playlists_data': playlists_data,
        'albums_data': albums_data,
        'listening_habits': listening_habits,
        'total_listening_minutes': total_listening_minutes,
        'total_listening_seconds': total_listening_seconds,
        'total_recently_played_minutes': total_recently_played_minutes,
        'total_recently_played_seconds': total_recently_played_seconds,
        'total_minutes_listened': total_minutes_listened,
        'top_track_name': top_track_name,
        'top_track_plays': top_track_plays,
        'new_artist_count': new_artist_count,
        'listening_personality_type': listening_personality_type,
        'top_genre': top_genres[0] if top_genres else None,
        'genre_minutes': genre_minutes,
        'top_artist_name': top_artist_name,
    }

    # Data for the Prompt
    top_artist_names = [artist['name'] for artist in artists_data]
    top_track_names = [track['name'] for track in tracks_data]
    top_genres = context['top_genres']

    # Build the prompt
    prompt = (
        f"Based on the following music preferences:\n"
        f"Top genres: {', '.join(top_genres)}.\n"
        f"Top artists: {', '.join(top_artist_names)}.\n"
        f"Top tracks: {', '.join(top_track_names)}.\n"
        "Describe how someone who listens to this kind of music tends to act, think, and dress.")

    # Call Gemini API
    try:
        gemini_response = gemini_api_request(prompt)
    except Exception as e:
        gemini_response = "We couldn't generate your musical personality at this time."

    # Include the Gemini API response in the context
    context['gemini_description'] = gemini_response

    return context
