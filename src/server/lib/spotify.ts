const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

export const genSpotifyAuthHeaders = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
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
   });

   return (await response.json()) as any as { access_token: string };
};

const getNowPlaying = async () => {
   const { access_token } = await getAccessToken();

   return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
   });
};

const getSpotifyData = async () => {
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

   return {
      artists: (await responseArtists.json()) as Artists,
      recentlyPlayed: (await responseRecently.json()) as RecentlyPlayed,
      songs: (await responseTracks.json()) as Songs,
   };
};

interface Image {
   height: number;
   width: number;
   url: string;
}

export interface SongTrack {
   songUrl?: string;
   title?: string;
   albumImageUrl?: string;
   artist?: string | null;
   album: {
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
   };
   artists: Artist[];
   available_markets: string[];
   disc_number: number;
   duration_ms: number;
   explicit: boolean;
   external_ids:
      | {
           isrc: string;
        }
      | Object;
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

interface Artists {
   items: Artist[];
   total: number;
   limit: number;
   offset: number;
   href: string;
   previous: any;
   next: string;
}

interface Artist {
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

interface RecentlyPlayed {
   items: RecentlyPlayedItem[];
   next: string;
   cursors: {
      after: string;
      before: string;
   };
   limit: number;
   href: string;
}

interface RecentlyPlayedItem {
   track: SongTrack;
   played_at: Date;
   context: any;
}

interface Songs {
   items: SongTrack[];
   total: number;
   limit: number;
   offset: number;
   previous: any;
   href: string;
   next: string;
}

export { getNowPlaying, getSpotifyData };
