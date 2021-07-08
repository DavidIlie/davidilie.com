import AristCard from "@components/MusicCards/ArtistCard";

const TopArtists = ({ artists }: { artists: any }): JSX.Element => {
    return (
        <div className="flex justify-center w-full space-x-6">
            {artists.items.map((artist: any, index: number) => (
                <AristCard artist={artist} key={index} />
            ))}
        </div>
    );
};

export default TopArtists;
