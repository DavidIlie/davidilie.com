import querystring from "querystring";

const client_id = "ce6114d303e14cb9bf12784ad01d5e7d";
const client_secret = "2860be2fd8ec47eea538bf409dbdfd56";
const refresh_token =
    "AQD9hk0AFxSq4qCU70MuhgpWMeTPGTzuroVXzEzC5mG-H1Sa-T5fjT7F1Ef5hV1E0fGbIpqXBL8ZH_NJaEb1EdEOvMZISMcrc_qi96widUSmjOatkL3u9KM4BMJ46tYa7h8";

const basic = Buffer.from(`${client_id}:${client_secret}`).toString(`base64`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: `POST`,
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": `application/x-www-form-urlencoded`,
        },
        body: querystring.stringify({
            grant_type: `refresh_token`,
            refresh_token,
        }),
    });

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getSpotifyData = async () => {
    const { access_token } = await getAccessToken();

    const responseTracks = await fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const responseArtists = await fetch(TOP_ARTISTS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const responseRecently = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return { responseArtists, responseRecently, responseTracks };
};