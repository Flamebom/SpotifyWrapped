import requests
import base64
import json
from urllib.parse import urlencode

CLIENT_ID = ""
CLIENT_SECRET = ""
REDIRECT_URI = 'http://localhost:8888/callback'
SCOPE = 'user-top-read'

AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE_URL = "https://api.spotify.com/v1"


def get_auth_url():
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'scope': SCOPE
    }
    return f"{AUTH_URL}?{urlencode(params)}"


def get_token(auth_code):
    headers = {
        "Authorization": "Basic " + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    }
    data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': REDIRECT_URI
    }
    response = requests.post(TOKEN_URL, headers=headers, data=data)
    return response.json().get("access_token")


def get_top_tracks(access_token, limit=5):
    endpoint = f"{API_BASE_URL}/me/top/tracks"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        'limit': limit
    }
    response = requests.get(endpoint, headers=headers, params=params)
    tracks = response.json().get('items', [])

    print("Your Top Tracks:")
    total_duration = 0
    for idx, track in enumerate(tracks, start=1):
        track_name = track['name']
        artist_name = track['artists'][0]['name']
        duration = track['duration_ms'] // 1000
        total_duration += duration

        audio_preview = track.get('preview_url')
        album_cover = track['album']['images'][0]['url']

        print(f"{idx}. {track_name} by {artist_name} - Duration: {duration // 60}m {duration % 60}s")
        print(f"   Audio Preview: {audio_preview}")
        print(f"   Album Cover: {album_cover}")

    total_minutes = total_duration // 60
    print(f"\nTotal Listening Time for Top Tracks: {total_minutes} minutes")

    return tracks


def get_top_artists(access_token, limit=5):
    endpoint = f"{API_BASE_URL}/me/top/artists"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        'limit': limit
    }
    response = requests.get(endpoint, headers=headers, params=params)
    artists = response.json().get('items', [])

    print("\nYour Top Artists:")
    for idx, artist in enumerate(artists, start=1):
        artist_name = artist['name']
        artist_id = artist['id']
        artist_image = artist['images'][0]['url'] if artist['images'] else None

        top_track_endpoint = f"{API_BASE_URL}/artists/{artist_id}/top-tracks"
        track_params = {'country': 'US'}
        top_track_response = requests.get(top_track_endpoint, headers=headers, params=track_params)
        top_track = top_track_response.json().get('tracks', [])[0]
        top_track_name = top_track['name']
        top_track_audio = top_track['preview_url']

        print(f"{idx}. {artist_name}")
        print(f"   Profile Picture: {artist_image}")
        print(f"   Top Track: {top_track_name}")
        print(f"   Top Track Audio Preview: {top_track_audio}")

    return artists


def get_top_genres(access_token, limit=5):
    endpoint = f"{API_BASE_URL}/me/top/artists"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        'limit': limit
    }
    response = requests.get(endpoint, headers=headers, params=params)
    genres = {}
    for artist in response.json().get('items', []):
        for genre in artist.get('genres', []):
            genres[genre] = genres.get(genre, 0) + 1

    top_genres = sorted(genres.items(), key=lambda x: x[1], reverse=True)
    print("\nYour Top Genres:")
    for idx, (genre, count) in enumerate(top_genres[:limit], start=1):
        print(f"{idx}. {genre}")


def get_recommendations(access_token, top_track, top_artist, limit=5):
    seed_artists = [top_artist['id']] if top_artist else []
    seed_tracks = [top_track['id']] if top_track else []

    endpoint = f"{API_BASE_URL}/recommendations"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        'seed_artists': ','.join(seed_artists),
        'seed_tracks': ','.join(seed_tracks),
        'limit': limit
    }
    response = requests.get(endpoint, headers=headers, params=params)
    recommendations = response.json().get('tracks', [])

    print("\nRecommended Songs for You:")
    for idx, track in enumerate(recommendations, start=1):
        track_name = track['name']
        artist_name = track['artists'][0]['name']
        audio_preview = track.get('preview_url')
        album_cover = track['album']['images'][0]['url']

        print(f"{idx}. {track_name} by {artist_name}")
        print(f"   Audio Preview: {audio_preview}")
        print(f"   Album Cover: {album_cover}")


if __name__ == "__main__":
    print("1. Go to the following URL to authorize your app:")
    print(get_auth_url())
    auth_code = input("\n2. Paste the authorization code here: ")

    access_token = get_token(auth_code)

    # Retrieve top tracks and artists
    top_tracks = get_top_tracks(access_token, limit=5)
    top_artists = get_top_artists(access_token, limit=5)
    get_top_genres(access_token, limit=5)

    # Use top track and top artist for recommendations
    if top_tracks and top_artists:
        get_recommendations(access_token, top_track=top_tracks[0], top_artist=top_artists[0], limit=5)
