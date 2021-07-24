import AristCard from "@components/MusicCards/ArtistCard";

import { Artists, Item } from "@interfaces/MusicData";

const TopArtists = ({ artists }: { artists: Artists }): JSX.Element => {
    return (
        <div className="flex justify-center w-full space-x-6">
            {artists.items.map((artist: Item, index: number) => (
                <AristCard artist={artist} key={index} />
            ))}
        </div>
    );
};

export default TopArtists;
