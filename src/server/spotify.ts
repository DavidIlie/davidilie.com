import { env } from "~/env.mjs";

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const refresh_token = env.SPOTIFY_REFRESH_TOKEN;

export const genSpotifyAuthHeaders = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
   if (!refresh_token) throw new Error("no refresh token");
   const response = await fetch(TOKEN_ENDPOINT, {
      method: `POST`,
      headers: {
         Authorization: `Basic ${genSpotifyAuthHeaders}`,
         "Content-Type": `application/x-www-form-urlencoded`,
      },
      body: new URLSearchParams({
         grant_type: `refresh_token`,
         refresh_token,
      }),
      cache: "no-cache",
   });

   return (await response.json()) as { access_token: string };
};

const getNowPlaying = async () => {
   const { access_token } = await getAccessToken();

   return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
   });
};

const getSpotifyData = async () => {
   const { access_token } = await getAccessToken();

   const standardBody = {
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
   } as RequestInit;

   const rTracks = await fetch(TOP_TRACKS_ENDPOINT, standardBody);
   const responseTracks = (await rTracks.json()) as Songs;

   const rArtists = await fetch(TOP_ARTISTS_ENDPOINT, standardBody);
   const responseArtists = (await rArtists.json()) as Artists;

   const rRecently = await fetch(RECENTLY_PLAYED_ENDPOINT, standardBody);
   const responseRecently = (await rRecently.json()) as RecentlyPlayed;

   return {
      artists: responseArtists,
      recentlyPlayed: responseRecently,
      songs: responseTracks,
   };
};

export const getPlayingStateAndSong = async (): Promise<{
   album?: string;
   albumImageUrl?: string;
   artist?: string;
   isPlaying: boolean;
   songUrl?: string;
   title?: string;
}> => {
   try {
      const response = await getNowPlaying();

      if (response.status === 204 || response.status > 400)
         return { isPlaying: false };

      const song = await response.json();
      if (song.item === null) return { isPlaying: false };

      const isPlaying = song.is_playing;
      const title = song.item.name;
      const artist = song.item.artists
         ?.map((artist: any) => artist.name as string)
         .join(", ");
      const album = song.item.album.name;
      const albumImageUrl = song.item.album.images[0].url;
      const songUrl = song.item.external_urls.spotify;

      return {
         album,
         albumImageUrl,
         artist,
         isPlaying,
         songUrl,
         title,
      };
   } catch (_error) {
      return { isPlaying: false };
   }
};

export interface Image {
   height: number;
   width: number;
   url: string;
}

export interface Album {
   album_type: "ALBUM" | any;
   artists: Artist[];
   available_markets: string[];
   external_urls: { spotify: string };
   href: string;
   id: string;
   images: Image[];
   name: string;
   release_date: string;
   release_date_precision: "day" | "month" | "year" | any;
   total_tracks: number;
   type: "album" | any;
   uri: string;
}

export interface SongTrack {
   songUrl?: string;
   title?: string;
   albumImageUrl?: string;
   artist?: string | null;
   album: Album;
   artists: Artist[];
   available_markets: string[];
   disc_number: number;
   duration_ms: number;
   explicit: boolean;
   external_ids:
      | {
           isrc: string;
        }
      | object;
   external_urls: { spotify: string };
   href: string;
   id: string;
   is_local: boolean;
   name: string;
   popularity: number;
   preview_url: string;
   track_number: number;
   type: "track" | any;
   uri: string;
}

export interface Artists {
   items: Artist[];
   total: number;
   limit: number;
   offset: number;
   href: string;
   previous: any;
   next: string;
}

export interface Artist {
   external_urls: { spotify: string };
   followers: { href: string | null; total: number };
   genres: string[];
   href: string;
   id: string;
   images: Image[];
   name: string;
   popularity: number;
   type: string;
   uri: string;
}

export interface RecentlyPlayed {
   items: RecentlyPlayedItem[];
   next: string;
   cursors: {
      after: string;
      before: string;
   };
   limit: number;
   href: string;
}

export interface RecentlyPlayedItem {
   track: SongTrack;
   played_at: Date;
   context: any;
}

export interface Songs {
   items: SongTrack[];
   total: number;
   limit: number;
   offset: number;
   previous: any;
   href: string;
   next: string;
}

export { getNowPlaying, getSpotifyData };
