import Image from "next/image";

const SongCard = ({ song, titleCard, isPlaying }) => {
    return (
        <div
            className="flex items-center rounded-2xl bg-gray-700 p-5 duration-200 mb-6"
            style={{ width: "650px", height: titleCard ? "175px" : "150px" }}
        >
            <Image
                alt={song?.name + " album cover"}
                width={titleCard ? `150px` : `110px`}
                height={titleCard ? `150px` : `110px`}
                className="rounded-2xl"
                src={
                    song.albumImageUrl ||
                    song.album.images
                        .filter((image) => image.height > 109)
                        .slice(-1)[0].url
                }
            />
            <div className="flex flex-col ml-5 -mt-2 max-w-full truncate">
                <h1 className="text-3xl truncate font-semibold">{`${song.name}${
                    titleCard && !isPlaying ? ` - Paused` : ``
                }`}</h1>
                <div className="flex flex-col mt-2 truncate max-w-full text-gray-300">
                    <h1>Album • {song.album.name || song.album}</h1>
                    <h1>
                        {" "}
                        Artist{song.artists?.length > 1 && `s`} •{` `}
                        {song.artist ||
                            song.artists
                                ?.map((artist) => artist.name)
                                .join(`, `)}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default SongCard;
