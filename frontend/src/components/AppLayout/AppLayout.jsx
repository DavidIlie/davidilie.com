import Head from "next/head";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

import { UpDown } from "@components/Animations/Animation";
import SVG from "@components/SVG";
import { Box } from "@chakra-ui/react";

export const AppLayout = ({ children, title }) => {
    return (
        <div>
            <Head>
                <title>David Ilie</title>
            </Head>
            <UpDown type="normal">
                <SVG icon="triangle" width={48} stroke left="10%" top="20%" />
                <SVG icon="hexa" width={48} stroke left="60%" top="70%" />

                <SVG icon="box" width={6} left="60%" top="15%" />
            </UpDown>
            <UpDown type="normal">
                <SVG icon="triangle" width={48} stroke left="50%" top="10%" />
                <SVG icon="hexa" width={48} stroke left="60%" top="20%" />

                <SVG icon="box" width={6} left="10%" top="39%" />
            </UpDown>
            <UpDown type="wide">
                <SVG icon="triangle" width={24} stroke left="65%" top="8%" />

                <SVG icon="triangle" width={12} stroke left="90%" top="50%" />

                <SVG icon="triangle" width={16} stroke left="30%" top="65%" />
            </UpDown>
            <UpDown type="wide">
                <SVG icon="triangle" width={24} stroke left="55%" top="17%" />

                <SVG icon="triangle" width={12} stroke left="12%" top="51%" />

                <SVG icon="triangle" width={16} stroke left="12%" top="51%" />
            </UpDown>
            <UpDown type="slow">
                <SVG
                    icon="circle"
                    width={20}
                    hiddenMobile
                    left="85%"
                    top="25%"
                />
                <SVG
                    icon="circle"
                    hiddenMobile
                    stroke
                    width={24}
                    left="5%"
                    top="70%"
                />
                <SVG icon="circle" width={6} left="4%" top="20%" />
                <SVG
                    icon="circle"
                    width={12}
                    left="50%"
                    top="60%"
                    color="gray.100"
                />
            </UpDown>
            <UpDown type="slow">
                <SVG
                    icon="circle"
                    width={20}
                    hiddenMobile
                    left="15%"
                    top="55%"
                />
                <SVG
                    icon="circle"
                    hiddenMobile
                    stroke
                    width={24}
                    left="55%"
                    top="10%"
                />
                <SVG icon="circle" width={6} left="4%" top="20%" />
                <SVG
                    icon="circle"
                    width={12}
                    left="57%"
                    top="10%"
                    color="gray.100"
                />
            </UpDown>
            <NavBar />
            <Box bg={"rgba(26, 33, 42, 0.8)"}>{children}</Box>
            <Footer />
        </div>
    );
};
