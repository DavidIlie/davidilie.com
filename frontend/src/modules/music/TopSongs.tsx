import SongCard from "@components/MusicCards/SongCard";

import { Item2 } from "@interfaces/MusicData";

const TopSongs = ({ songs }: { songs: Item2[] }): JSX.Element => {
    return (
        <div className="flex justify-center flex-col max-w-2xl w-full mx-auto truncated overflow-visible">
            {songs.map((song: Item2, index: number) => {
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
