import SongCard from "@components/MusicCards/SongCard";

import { Item3 } from "@interfaces/MusicData";

const RecentSongs = ({ songs }: { songs: Item3[] }): JSX.Element => {
    return (
        <div className="flex justify-center flex-col max-w-2xl w-full mx-auto truncated overflow-visible">
            {songs.map((song: Item3, index: number) => (
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
