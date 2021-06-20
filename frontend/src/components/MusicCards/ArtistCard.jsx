import { Box, Skeleton, Text } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/styles.module.css";

const AristCard = ({ artist }) => {
    const [imageLoad, setImageLoad] = useState(false);
    return (
        <Box
            as="a"
            target="_blank"
            href={artist.external_urls.spotify}
            overflow="visible"
            position="relative"
            maxHeight="150px"
            maxWidth="150px"
            mx="auto"
            boxShadow="dark-lg"
            outline="none"
            transition="all 0.25s"
            borderRadius="2xl"
            transitionTimingFunction="spring(1 100 10 10)"
            _hover={{ transform: `translateY(-4px)`, shadow: `dark-xl` }}
        >
            <Skeleton
                overflow="visible"
                maxWidth="150px"
                borderRadius="2xl"
                maxHeight="150px"
                boxSize="full"
                mx="auto"
                isLoaded={imageLoad}
            >
                <Image
                    className={styles.artistImage}
                    alt={artist?.name + " artist image"}
                    width="150px"
                    height="150px"
                    onLoad={() => setImageLoad(true)}
                    src={
                        artist.images
                            .filter((image) => image.height >= 150)
                            .slice(-1)[0].url
                    }
                />
            </Skeleton>

            <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontWeight="semibold"
                fontSize="lg"
                display="inline"
                maxWidth="150px"
                width="full"
                color="white"
                textAlign="center"
                zIndex={100}
            >
                {artist.name}
            </Text>
        </Box>
    );
};

export default AristCard;
