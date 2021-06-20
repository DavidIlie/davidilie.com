import { useState } from "react";
import Image from "next/image";

import { Box, Flex, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";

import styles from "../../styles/styles.module.css";

const SongCard = ({ song, titleCard, isPlaying }) => {
    const [imageLoad, setImageLoad] = useState(false);
    return (
        <Box
            as="a"
            target="_blank"
            href={song.external_urls?.spotify}
            h="full"
            w="650px"
            isTruncated
            overflow="visible"
        >
            <SimpleGrid
                my={5}
                p={5}
                overflow="visible"
                width="650px"
                maxWidth="2xl"
                templateColumns={`${titleCard ? `150px` : `110px`} 1fr`}
                border="1px solid"
                bg={"gray.800"}
                borderColor={"gray.800"}
                boxShadow="lg"
                transition="all 0.25s"
                borderRadius="2xl"
                transitionTimingFunction="spring(1 100 10 10)"
                _hover={{ transform: `translateY(-4px)`, shadow: `xl` }}
            >
                <Skeleton
                    borderRadius="2xl"
                    boxSize={titleCard ? `150px` : `110px`}
                    isLoaded={imageLoad}
                >
                    <Image
                        alt={song?.name + " album cover"}
                        className={styles.image}
                        width={titleCard ? `150px` : `110px`}
                        height={titleCard ? `150px` : `110px`}
                        onLoad={() => setImageLoad(true)}
                        src={
                            song.albumImageUrl ||
                            song.album.images
                                .filter((image) => image.height > 109)
                                .slice(-1)[0].url
                        }
                    />
                </Skeleton>

                <Flex direction="column" ml={5} maxWidth="full" isTruncated>
                    <Text
                        isTruncated
                        maxWidth="full"
                        fontSize={
                            titleCard
                                ? { base: `2xl`, md: `3xl` }
                                : { base: `xl`, md: `2xl` }
                        }
                        fontWeight="semibold"
                    >
                        {`${song.name}${
                            titleCard && !isPlaying ? ` - Paused` : ``
                        }`}
                    </Text>
                    <Flex
                        direction="column"
                        color="gray.400"
                        mt={2}
                        isTruncated
                        width="full"
                        fontSize={{ base: `sm`, sm: `md` }}
                    >
                        <Text isTruncated maxWidth="full">
                            Album • {song.album.name || song.album}
                        </Text>
                        <Text isTruncated maxWidth="full">
                            Artist{song.artists?.length > 1 && `s`} •{` `}
                            {song.artist ||
                                song.artists
                                    ?.map((artist) => artist.name)
                                    .join(`, `)}
                        </Text>
                    </Flex>
                </Flex>
            </SimpleGrid>
        </Box>
    );
};

export default SongCard;
