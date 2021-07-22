import Image from "next/image";
import styles from "../../styles/styles.module.css";

interface SongCardProps {
    song: any;
    titleCard: boolean;
    isPlaying: boolean;
}

const SongCard = ({
    song,
    titleCard,
    isPlaying,
}: SongCardProps): JSX.Element => {
    return (
        <div>
            {song !== undefined && (
                <a
                    target="_blank"
                    href={song.external_urls?.spotify}
                    style={{ width: "600px" }}
                    className="h-full overflow-visible"
                >
                    <div
                        style={{
                            width: "600px",
                            gridTemplateColumns: `${
                                titleCard ? `150px` : `110px`
                            } 1fr`,
                        }}
                        className="grid my-5 p-5 overflow-visible max-w-2xl bg-gray-800 border-2 border-gray-700 shadow-lg duration-200 rounded-2xl hover:shadow-xl hoverItem cursor-pointer"
                    >
                        <div
                            // style={{ boxSizing: titleCard ? `150px` : `110px` }}
                            className="rounded-2xl"
                        >
                            <Image
                                alt={song?.name + " album cover"}
                                className={styles.image}
                                width={titleCard ? `150px` : `110px`}
                                height={titleCard ? `150px` : `110px`}
                                blurDataURL={
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                                }
                                placeholder="blur"
                                src={
                                    song.albumImageUrl ||
                                    song.album.images
                                        .filter((image) => image.height > 109)
                                        .slice(-1)[0].url
                                }
                            />
                        </div>

                        <div className="flex flex-col ml-5 max-w-full truncate">
                            <p className="truncate font-semibold text-2xl max-w-full">
                                {`${song.name}${
                                    titleCard && !isPlaying ? ` - Paused` : ``
                                }`}
                            </p>
                            <div className="flex flex-col text-gray-400 mt-2 truncate w-full">
                                <h1 className="truncate max-w-ful">
                                    Album • {song.album.name || song.album}
                                </h1>
                                <p className="truncate max-w-full">
                                    Artist{song.artists?.length > 1 && `s`} •
                                    {` `}
                                    {song.artist ||
                                        song.artists
                                            ?.map((artist) => artist.name)
                                            .join(`, `)}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
};

export default SongCard;