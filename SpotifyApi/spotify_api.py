import spotipy
from spotipy.oauth2 import SpotifyOAuth

CLIENT_ID = ""
CLIENT_SECRET = ""
REDIRECT_URI = 'http://localhost:8888/callback'

SCOPE = 'user-top-read'

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope=SCOPE
))


def get_top_tracks(limit=5):
    results = sp.current_user_top_tracks(limit=limit)
    print("Your Top Tracks:")
    total_duration = 0

    for idx, track in enumerate(results['items'], start=1):
        track_name = track['name']
        artist_name = track['artists'][0]['name']
        duration = track['duration_ms'] // 1000
        total_duration += duration

        # Get audio preview and album cover
        audio_preview = track['preview_url']
        album_cover = track['album']['images'][0]['url']

        print(f"{idx}. {track_name} by {artist_name} - Duration: {duration // 60}m {duration % 60}s")
        print(f"   Audio Preview: {audio_preview}")
        print(f"   Album Cover: {album_cover}")

    total_minutes = total_duration // 60
    print(f"\nTotal Listening Time for Top Tracks: {total_minutes} minutes")


def get_top_artists(limit=5):
    results = sp.current_user_top_artists(limit=limit)
    print("\nYour Top Artists:")
    for idx, artist in enumerate(results['items'], start=1):
        print(f"{idx}. {artist['name']}")


def get_top_genres(limit=5):
    results = sp.current_user_top_artists(limit=limit)
    genres = {}
    for artist in results['items']:
        for genre in artist['genres']:
            genres[genre] = genres.get(genre, 0) + 1

    # Sort genres by frequency and display top ones
    top_genres = sorted(genres.items(), key=lambda x: x[1], reverse=True)
    print("\nYour Top Genres:")
    for idx, (genre, count) in enumerate(top_genres[:limit], start=1):
        print(f"{idx}. {genre}")


def get_recommendations(limit=5):
    top_tracks = sp.current_user_top_tracks(limit=1)['items']
    top_artists = sp.current_user_top_artists(limit=1)['items']

    seed_artists = [top_artists[0]['id']] if top_artists else []
    seed_tracks = [top_tracks[0]['id']] if top_tracks else []

    recommendations = sp.recommendations(seed_artists=seed_artists, seed_tracks=seed_tracks, limit=limit)
    print("\nRecommended Songs for You:")
    for idx, track in enumerate(recommendations['tracks'], start=1):
        track_name = track['name']
        artist_name = track['artists'][0]['name']

        audio_preview = track['preview_url']
        album_cover = track['album']['images'][0]['url']

        print(f"{idx}. {track_name} by {artist_name}")
        print(f"   Audio Preview: {audio_preview}")
        print(f"   Album Cover: {album_cover}")


if __name__ == "__main__":
    get_top_tracks(limit=5)
    get_top_artists(limit=5)
    get_top_genres(limit=5)
    get_recommendations(limit=5)
