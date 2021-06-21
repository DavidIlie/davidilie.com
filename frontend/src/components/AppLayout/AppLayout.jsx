import Head from "next/head";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

import { UpDown } from "@components/Animations/Animation";
import SVG from "@components/SVG";
import { Box } from "@chakra-ui/react";

export const AppLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>David Ilie</title>
            </Head>
            <UpDown type="normal">
                <SVG icon="triangle" width={48} stroke left="10%" top="80%" />
                <SVG icon="hexa" width={48} stroke left="60%" top="6%" />
                <SVG icon="box" width={6} left="60%" top="4%" />
                <SVG icon="triangle" width={48} stroke left="98%" top="8%" />
                <SVG icon="hexa" width={48} stroke left="30%" top="25%" />
                <SVG icon="box" width={6} left="12%" top="70%" />
                <SVG icon="triangle" width={48} stroke left="80%" top="14%" />
                <SVG icon="box" width={6} left="18%" top="29%" />
                <SVG icon="triangle" width={48} stroke left="12%" top="28%" />
                <SVG icon="hexa" width={48} stroke left="10%" top="5%" />
                <SVG icon="box" width={6} left="70%" top="22%" />
            </UpDown>
            <UpDown type="wide">
                <SVG icon="hexa" width={24} stroke left="65%" top="8%" />
                <SVG icon="box" width={12} stroke left="10%" top="50%" />
                <SVG icon="triangle" width={16} stroke left="30%" top="24%" />
                <SVG icon="hexa" width={24} stroke left="12%" top="80%" />
                <SVG icon="triangle" width={12} stroke left="50%" top="32%" />
                <SVG icon="triangle" width={16} stroke left="80%" top="21%" />
                <SVG icon="hexa" width={24} stroke left="85%" top="8%" />
                <SVG icon="triangle" width={12} stroke left="90%" top="73%" />
                <SVG icon="hexa" width={16} stroke left="60%" top="84%" />
                <SVG icon="box" width={24} stroke left="42%" top="95%" />
                <SVG icon="triangle" width={12} stroke left="80%" top="76%" />
                <SVG icon="hexa" width={16} stroke left="10%" top="87%" />
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
            <NavBar />
            <Box bg={"rgba(26, 33, 42, 0.8)"}>{children}</Box>
            <Footer />
        </div>
    );
};
