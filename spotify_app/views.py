import requests
import base64
from django.shortcuts import redirect, render
from django.conf import settings
from urllib.parse import urlencode
from django.http import HttpResponse

# spotify API URLs
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

def spotify_login(request):
    """Redirect user to Spotify login page."""
    return redirect(get_auth_url())

def spotify_callback(request):
    """Handle Spotify callback and retrieve access token."""
    code = request.GET.get('code')
    if not code:
        return HttpResponse('No code provided in the callback.')
    auth_header = base64.b64encode(f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}".encode()).decode()
    headers = {"Authorization": f"Basic {auth_header}"}
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI
    }
    response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=data)
    if response.status_code != 200:
        return HttpResponse(f"Failed to get token: {response.text}")
    access_token = response.json().get('access_token')
    request.session['access_token'] = access_token
    return redirect('spotify_profile')

def get_spotify_data(endpoint, access_token, params=None):
    """Helper function to interact with the Spotify API."""
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(f"{SPOTIFY_API_BASE_URL}/{endpoint}", headers=headers, params=params)
    if response.status_code != 200:
        return {}
    return response.json()

def spotify_profile(request):
    """Display user profile with detailed Spotify data."""
    access_token = request.session.get('access_token')
    if not access_token:
        return redirect('spotify_login')

    tracks_data = []
    artists_data = []
    playlists_data = []
    albums_data = []
    top_genres = []
    listening_habits = {}
    recommended_tracks = []
    total_listening_time = 0
    total_recently_played_time = 0

    # user profile information
    user_profile = get_spotify_data("me", access_token)
    user_name = user_profile.get('display_name', 'User')

    # top tracks for long term
    top_tracks_long_term = get_spotify_data(
        "me/top/tracks", access_token, params={'limit': 5, 'time_range': 'long_term'}
    )

    if top_tracks_long_term.get('items'):
        # total listening time for top tracks
        total_listening_time = sum(
            track['duration_ms'] for track in top_tracks_long_term.get('items', [])
        ) // 1000  # Convert to seconds

        # top tracks data
        for track in top_tracks_long_term.get('items', []):
            duration_seconds = track['duration_ms'] // 1000
            minutes = duration_seconds // 60
            seconds = duration_seconds % 60
            track_info = {
                "id": track['id'],
                "name": track['name'],
                "artist": ', '.join(artist['name'] for artist in track['artists']),
                "duration": duration_seconds,  # Total duration in seconds
                "minutes": minutes,
                "seconds": seconds,
                "preview_url": track.get('preview_url'),
                "album_cover": track['album']['images'][0]['url'] if track['album']['images'] else None,
            }
            tracks_data.append(track_info)

    # top artists for long term
    top_artists_long_term = get_spotify_data(
        "me/top/artists", access_token, params={'limit': 5, 'time_range': 'long_term'}
    )

    genres_count = {}
    if top_artists_long_term.get('items'):
        for artist in top_artists_long_term.get('items', []):
            artist_info = {
                "id": artist['id'],
                "name": artist['name'],
                "image": artist['images'][0]['url'] if artist['images'] else None,
                "genres": artist.get('genres', []),
            }
            # top track of the artist
            top_track_data = get_spotify_data(
                f"artists/{artist['id']}/top-tracks", access_token, {'country': 'US'}
            )
            if top_track_data.get('tracks'):
                top_track = top_track_data['tracks'][0]
                artist_info['top_track_name'] = top_track.get('name')
                artist_info['top_track_preview'] = top_track.get('preview_url')
            else:
                artist_info['top_track_name'] = None
                artist_info['top_track_preview'] = None
            artists_data.append(artist_info)
            # count genres
            for genre in artist.get('genres', []):
                genres_count[genre] = genres_count.get(genre, 0) + 1

    # sort genres by count in descending order and get top 5 genres
    sorted_genres = sorted(genres_count.items(), key=lambda x: x[1], reverse=True)
    top_genres = [genre for genre, count in sorted_genres[:5]]

    # listening habits over different time ranges
    time_ranges = {
        'Last 4 weeks': 'short_term',
        'Last 6 months': 'medium_term',
        'All time': 'long_term'
    }
    for label, time_range in time_ranges.items():
        # top tracks
        top_tracks = get_spotify_data(
            "me/top/tracks", access_token, params={'limit': 5, 'time_range': time_range}
        )
        tracks = [
            {
                "name": track['name'],
                "artist": ', '.join(artist['name'] for artist in track['artists']),
                "album_cover": track['album']['images'][0]['url'] if track['album']['images'] else None,
                "preview_url": track.get('preview_url'),
            }
            for track in top_tracks.get('items', [])
        ]
        # top artists
        top_artists = get_spotify_data(
            "me/top/artists", access_token, params={'limit': 5, 'time_range': time_range}
        )
        artists = [
            {
                "name": artist['name'],
                "image": artist['images'][0]['url'] if artist['images'] else None,
            }
            for artist in top_artists.get('items', [])
        ]
        listening_habits[label] = {
            'tracks': tracks,
            'artists': artists,
        }

    # user's playlists
    playlists = get_spotify_data("me/playlists", access_token, params={'limit': 5})
    if playlists.get('items'):
        for playlist in playlists.get('items', []):
            playlist_info = {
                "name": playlist['name'],
                "image": playlist['images'][0]['url'] if playlist['images'] else None,
                "tracks_total": playlist['tracks']['total'],
                "id": playlist['id'],
            }
            playlists_data.append(playlist_info)

    # user's saved albums
    saved_albums = get_spotify_data("me/albums", access_token, params={'limit': 5})
    if saved_albums.get('items'):
        for item in saved_albums.get('items', []):
            album = item['album']
            album_info = {
                "name": album['name'],
                "artist": ', '.join(artist['name'] for artist in album['artists']),
                "image": album['images'][0]['url'] if album['images'] else None,
                "release_date": album['release_date'],
            }
            albums_data.append(album_info)

    # recommendations based on top tracks and artists
    if tracks_data and artists_data:
        seed_artists = [artist['id'] for artist in top_artists_long_term.get('items', [])][:2]
        seed_tracks = [track['id'] for track in top_tracks_long_term.get('items', [])][:2]
        recommendations = get_spotify_data(
            "recommendations", access_token, {
                'seed_artists': ','.join(seed_artists),
                'seed_tracks': ','.join(seed_tracks),
                'limit': 5
            }
        )
        if recommendations.get('tracks'):
            recommended_tracks = [
                {
                    "name": track['name'],
                    "artist": ', '.join(artist['name'] for artist in track['artists']),
                    "preview_url": track.get('preview_url'),
                    "album_cover": track['album']['images'][0]['url'] if track['album']['images'] else None,
                } for track in recommendations.get('tracks', [])
            ]

    # recently played tracks for total listening time approximation
    recently_played = get_spotify_data("me/player/recently-played", access_token, params={'limit': 50})
    if recently_played.get('items'):
        total_recently_played_time = sum(
            item['track']['duration_ms'] for item in recently_played.get('items', [])
        ) // 1000  # Convert to seconds

    # approximate total minutes listened
    total_minutes_listened = (total_listening_time + total_recently_played_time) // 60  # Convert to minutes

    # top track name
    if tracks_data:
        top_track_name = tracks_data[0]['name']
    else:
        top_track_name = None

    # Since I cannot get the number of times the top track was played, I will set a placeholder
    top_track_plays = "many"

    # new artist count (number of unique artists in top artists long term)
    new_artist_count = len(top_artists_long_term.get('items', [])) if top_artists_long_term.get('items') else 0

    # top genre count
    top_genre_count = len(top_genres)

    # Listening Personality Type
    if new_artist_count >= 20:
        listening_personality_type = f"You’re The Discoverer, always on the hunt for new music! You found {new_artist_count} new artists this year."
    elif top_genre_count > 5:
        listening_personality_type = "You’re The Genre Enthusiast, exploring a diverse range of music!"
    else:
        listening_personality_type = "You have a unique listening style!"

    # most played genre
    if top_genres:
        top_genre = top_genres[0]
    else:
        top_genre = None


    genre_minutes = "many"

    # top artist name
    if artists_data:
        top_artist_name = artists_data[0]['name']
    else:
        top_artist_name = None

    # total listening times
    total_listening_minutes = total_listening_time // 60
    total_listening_seconds = total_listening_time % 60

    total_recently_played_minutes = total_recently_played_time // 60
    total_recently_played_seconds = total_recently_played_time % 60

    # context for the template
    context = {
        'user_name': user_name,
        'tracks_data': tracks_data,
        'artists_data': artists_data,
        'top_genres': top_genres,
        'recommended_tracks': recommended_tracks,
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
        'top_genre': top_genre,
        'genre_minutes': genre_minutes,
        'top_artist_name': top_artist_name,
    }

    return render(request, 'spotify_app/profile.html', context)

def home(request):
    """Render the home page."""
    return render(request, 'spotify_app/home.html')
