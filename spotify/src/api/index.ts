import express from "express";
import { Request, Response } from "express";

import SongProps from "@interfaces/Song";

const router = express.Router();

const { getSpotifyData, getNowPlaying } = require("../utils/spotify");

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "spotify api" });
});

router.get("/get-now-playing", async (req: Request, res: Response) => {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
        return res.status(200).json({ isPlaying: false });
    }

    const song: SongProps = await response.json();

    const isPlaying = song.is_playing;
    const { name } = song.item;
    const artist = song.item.artists
        .map((_artist: any) => _artist.name)
        .join(`, `);
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images
        .filter((image: any) => image.height > 109)
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
});

router.get("/get-data", async (req: Request, res: Response) => {
    try {
        const { responseTracks, responseArtists, responseRecently } =
            await getSpotifyData();

        if (responseRecently.status !== 200) {
            return res
                .status(responseRecently.status)
                .json({ error: `there was an error` });
        }

        if (responseArtists.status !== 200) {
            return res
                .status(responseArtists.status)
                .json({ error: `there was an error` });
        }
        if (responseTracks.status !== 200) {
            return res
                .status(responseTracks.status)
                .json({ error: `there was an error` });
        }

        const artists = await responseArtists.json();
        const songs = await responseTracks.json();
        const recentlyPlayed = await responseRecently.json();

        res.setHeader(
            `Cache-Control`,
            `public, s-maxage=60, stale-while-revalidate=60`
        );

        return res.status(200).json({ artists, songs, recentlyPlayed });
    } catch (e) {
        console.log(e);
        if (e.response.status === 429) {
            return res.status(429).json({
                message: `you need to wait ${e.headers[`Retry-After`]}`,
            });
        }
        return res
            .status(500)
            .json({ message: `there was an error`, code: e.response.status });
    }
});

export default router;
