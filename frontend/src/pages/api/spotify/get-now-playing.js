import { getNowPlaying } from "@lib/spotify";

export default async function getPlaying(req, res) {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
        return res.status(200).json({ isPlaying: false });
    }

    const song = await response.json();

    const isPlaying = song.is_playing;
    const { name } = song.item;
    const artist = song.item.artists.map((_artist) => _artist.name).join(`, `);
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images
        .filter((image) => image.height > 109)
        .slice(-1)[0].url;
    const songUrl = song.item.external_urls.spotify;

    res.setHeader(
        `Cache-Control`,
        `public, s-maxage=60, stale-while-revalidate=30`
    );

    return res.status(200).json({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        name,
        time: {
            currentMs: song.progress_ms,
            totalMs: song.item.duration_ms,
        },
    });
}
