import SongCard from "@components/MusicCards/SongCard";

const RecentSongs = ({ songs }) => {
    return (
        <div className="flex justify-center flex-col max-w-2xl w-full mx-auto truncated overflow-visible">
            {songs.map((song, index) => (
                <SongCard song={song.track} key={index} />
            ))}
        </div>
    );
};

export default RecentSongs;
