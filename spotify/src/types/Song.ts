export interface ExternalUrls {
    spotify: string;
}

export interface Context {
    external_urls: ExternalUrls;
    href: string;
    type: string;
    uri: string;
}

export interface ExternalUrls2 {
    spotify: string;
}

export interface Artist {
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalUrls3 {
    spotify: string;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: any[];
    external_urls: ExternalUrls3;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface ExternalUrls4 {
    spotify: string;
}

export interface Artist2 {
    external_urls: ExternalUrls4;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalIds {
    isrc: string;
}

export interface ExternalUrls5 {
    spotify: string;
}

export interface Item {
    album: Album;
    artists: Artist2[];
    available_markets: any[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls5;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url?: any;
    track_number: number;
    type: string;
    uri: string;
}

export interface Disallows {
    resuming: boolean;
    skipping_prev: boolean;
}

export interface Actions {
    disallows: Disallows;
}

export default interface SongProps {
    timestamp: number;
    context: Context;
    progress_ms: number;
    item: Item;
    currently_playing_type: string;
    actions: Actions;
    is_playing: boolean;
}
