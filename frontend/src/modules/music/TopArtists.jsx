import AristCard from "@components/MusicCards/ArtistCard";

const TopArtists = (props) => {
    const artists = props.artists;
    return (
        <div className="flex justify-center space-x-6">
            {artists.items.map((artist, index) => (
                <AristCard artist={artist} index={index} />
            ))}
        </div>
    );
};

export default TopArtists;
