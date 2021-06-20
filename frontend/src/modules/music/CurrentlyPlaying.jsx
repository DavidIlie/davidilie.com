import SongCard from "@components/MusicCards/SongCard";

const CurrentlyPlaying = ({ song }) => {
    return song?.isPlaying ? (
        <SongCard song={song} titleCard isPlaying={song.isPlaying} />
    ) : (
        <h1 className="text-center">Nothing playing</h1>
    );
};

export default CurrentlyPlaying;
