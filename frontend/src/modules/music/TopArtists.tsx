import AristCard from "@components/MusicCards/ArtistCard";

import { Artists, Item } from "@interfaces/MusicData";

const TopArtists = ({ artists }: { artists: Artists }): JSX.Element => {
    return (
        <div className="flex justify-center w-full gap-5 max-w-2xl">
            {artists.items.map((artist: Item, index: number) => (
                <AristCard artist={artist} key={index} />
            ))}
        </div>
    );
};

export default TopArtists;
