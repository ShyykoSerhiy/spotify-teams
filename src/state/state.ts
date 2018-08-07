export const deviceExample = {
    "id": "5fbb3ba6aa454b5534c4ba43a8c7e8e45a63ad0e",
    "is_active": false,
    "is_private_session": true,
    "is_restricted": false,
    "name": "My fridge",
    "type": "Computer",
    "volume_percent": 100
};
export const playlistExample = {
    "collaborative": false,
    "external_urls": {
        "spotify": "https://open.spotify.com/user/shyyko.serhiy/playlist/1hHZ6mhBdVZjr3OwGciflY"
    },
    "href": "https://api.spotify.com/v1/users/shyyko.serhiy/playlists/1hHZ6mhBdVZjr3OwGciflY",
    "id": "1hHZ6mhBdVZjr3OwGciflY",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/7bb2ddeeed3584a12bf0d5ba28744f1a513cfe5e",
            "width": 640
        }
    ],
    "name": "Cro",
    "owner": {
        "display_name": "Serhiy Shyyko",
        "external_urls": {
            "spotify": "https://open.spotify.com/user/shyyko.serhiy"
        },
        "href": "https://api.spotify.com/v1/users/shyyko.serhiy",
        "id": "shyyko.serhiy",
        "type": "user",
        "uri": "spotify:user:shyyko.serhiy"
    },
    "primary_color": null,
    "public": true,
    "snapshot_id": "Myw5ZGZiZGY4MDFjZWMzY2U1MmQ1OTBmOGFiY2I0MTJkYmM3MjJhNjRj",
    "tracks": {
        "href": "https://api.spotify.com/v1/users/shyyko.serhiy/playlists/1hHZ6mhBdVZjr3OwGciflY/tracks",
        "total": 32
    },
    "type": "playlist",
    "uri": "spotify:user:shyyko.serhiy:playlist:1hHZ6mhBdVZjr3OwGciflY"
};
export const trackExample = {
    "track": {
        "album": {
            "id": "1LdR3si9EGC2Eav5Arcn0T",
            "name": "That Dress"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3uhfMjcE5HJqMIWh3Iolw0"
                },
                "href": "https://api.spotify.com/v1/artists/3uhfMjcE5HJqMIWh3Iolw0",
                "id": "3uhfMjcE5HJqMIWh3Iolw0",
                "name": "The Pale White",
                "type": "artist",
                "uri": "spotify:artist:3uhfMjcE5HJqMIWh3Iolw0"
            }
        ],
        "id": "4I9qjUCx8jFQkFFi5Eyt5x",
        "name": "That Dress",
        "uri": "spotify:track:4I9qjUCx8jFQkFFi5Eyt5x"
    }
}; 

export type Device = typeof deviceExample;
export type Playlist = typeof playlistExample;
export type Track = typeof trackExample;

export interface IStoreState {
    devices: Device[],
    playlists: Playlist[]
    tracks: Map<string, Track[]>
}
