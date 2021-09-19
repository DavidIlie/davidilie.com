import SongCard from "@components/MusicCards/SongCard";

import { Item3 } from "@interfaces/MusicData";

const RecentSongs = ({ songs }: { songs: Item3[] }): JSX.Element => {
    return (
        <>
            {songs.map((song: Item3, index: number) => (
                <SongCard
                    song={song.track}
                    key={index}
                    titleCard={false}
                    isPlaying={false}
                />
            ))}
        </>
    );
};

export default RecentSongs;
