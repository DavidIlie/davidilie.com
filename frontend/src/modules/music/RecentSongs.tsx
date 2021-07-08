import SongCard from "@components/MusicCards/SongCard";

const RecentSongs = ({ songs }: { songs: any }): JSX.Element => {
    return (
        <div className="flex justify-center flex-col max-w-2xl w-full mx-auto truncated overflow-visible">
            {songs.map((song: any, index: number) => (
                <SongCard
                    song={song.track}
                    key={index}
                    titleCard={false}
                    isPlaying={false}
                />
            ))}
        </div>
    );
};

export default RecentSongs;
