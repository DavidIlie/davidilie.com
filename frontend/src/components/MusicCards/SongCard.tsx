import Image from "next/image";
import styles from "../../styles/styles.module.css";

import { Item2 } from "@interfaces/MusicData";
import { shimmer } from "@lib/shimmer";

interface SongCardProps {
    song: Item2;
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
                    rel="noreferrer"
                    href={song.external_urls?.spotify}
                    className="h-full overflow-visible max-w-xl"
                >
                    <div
                        style={{
                            gridTemplateColumns: `${
                                titleCard ? `150px` : `110px`
                            } 1fr`,
                        }}
                        className="grid my-5 p-5 overflow-visible max-w-xl bg-gray-100 border-gray-200 dark:bg-gray-800 border-2 dark:border-gray-700 shadow-lg duration-200 rounded-2xl hover:shadow-xl hoverItem cursor-pointer"
                    >
                        <div
                            //@ts-ignore
                            style={{ boxSizing: titleCard ? `150px` : `110px` }}
                            className="rounded-2xl"
                        >
                            <Image
                                alt={song?.name + " album cover"}
                                className={styles.image}
                                width={titleCard ? `150px` : `110px`}
                                height={titleCard ? `150px` : `110px`}
                                blurDataURL={shimmer(1920, 1080)}
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
