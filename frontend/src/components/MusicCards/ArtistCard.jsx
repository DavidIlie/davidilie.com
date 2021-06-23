import Image from "next/image";
import styles from "../../styles/styles.module.css";

const AristCard = ({ artist }) => {
    return (
        <a
            target="_blank"
            href={artist.external_urls.spotify}
            style={{ maxHeight: "150px", maxWidth: "150px" }}
            className="overflow-visible relative mx-auto shadow-lg outline-none duration-200 rounded-2xl transform hoverItem hover:shadow-xl"
            _hover={{ transform: `translateY(-4px)`, shadow: `dark-xl` }}
        >
            <Image
                className={styles.artistImage}
                alt={artist?.name + " artist image"}
                width="150px"
                height="150px"
                blurDataURL={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                }
                placeholder="blur"
                src={
                    artist.images
                        .filter((image) => image.height >= 150)
                        .slice(-1)[0].url
                }
            />

            <p
                className="absolute font-semibold text-section inline w-full text-center"
                style={{
                    zIndex: 100,
                    transform: "translate(-50%, -50%)",
                    maxWidth: "150px",
                    top: "50%",
                    left: "50%",
                }}
            >
                {artist.name}
            </p>
        </a>
    );
};

export default AristCard;
