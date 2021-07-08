import SongCard from "@components/MusicCards/SongCard";

const CurrentlyPlaying = ({ song }: { song: any }) => {
    return song?.isPlaying ? (
        <SongCard song={song} titleCard isPlaying={song.isPlaying} />
    ) : (
        <h1 className="text-center">Nothing playing</h1>
    );
};

export default CurrentlyPlaying;
