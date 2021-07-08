import SongCard from "@components/MusicCards/SongCard";

const TopSongs = ({ songs }: { songs: any }): JSX.Element => {
    return (
        <div className="flex justify-center flex-col max-w-2xl w-full mx-auto truncated overflow-visible">
            {songs.map((song: any, index: number) => {
                return (
                    <SongCard
                        song={song}
                        key={index}
                        titleCard={false}
                        isPlaying={false}
                    />
                );
            })}
        </div>
    );
};

export default TopSongs;
