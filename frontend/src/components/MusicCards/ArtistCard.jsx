import Image from "next/image";

const AristCard = ({ artist, index }) => {
    return (
        <div className="relative ">
            <Image
                alt={artist?.name + " artist image"}
                key={index}
                className="filter brightness-50 rounded-2xl"
                src={
                    artist.images
                        .filter((image) => image.height >= 150)
                        .slice(-1)[0].url
                }
                width="150px"
                height="150px"
            />
            <div className="absolute inset-0 flex justify-center items-center text-section font-semibold hover:mt-4 duration-200">
                {artist.name}
            </div>
        </div>
    );
};

export default AristCard;
