import SongCard from "@components/MusicCards/SongCard";

import { Item2 } from "@interfaces/MusicData";

const TopSongs = ({ songs }: { songs: Item2[] }): JSX.Element => {
    return (
        <>
            {songs.map((song: Item2, index: number) => (
                <SongCard
                    song={song}
                    key={index}
                    titleCard={false}
                    isPlaying={false}
                />
            ))}
        </>
    );
};

export default TopSongs;
