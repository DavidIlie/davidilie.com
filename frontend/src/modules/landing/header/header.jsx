import { useState, useEffect } from "react";
import { SplitText } from "@utils/SplitText";
import { AnimatePresence, motion } from "framer-motion";

import Socials from "./socials";

export default function Header() {
    const [secondVisible, setSecondVisible] = useState(false);
    const [thirdVisible, setThirdVisible] = useState(false);
    useEffect(async () => {
        setTimeout(() => {
            setSecondVisible(true);
            setTimeout(() => {
                setThirdVisible(true);
            }, 500);
        }, 500);
    }, []);
    const fadeIn = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 0.5,
            },
        },
    };
    return (
        <div className="h-full flex justify-center items-center space-x-32 bg-background bg-cover">
            <div className="text-white text-center">
                <AnimatePresence>
                    <div className="mt-2 h-10 text-center -ml-2">
                        <SplitText
                            initial={{ y: "100%" }}
                            animate="visible"
                            className="text-4xl"
                            variants={{
                                visible: (i) => ({
                                    y: 0,
                                    transition: {
                                        delay: i * 0.1,
                                    },
                                }),
                            }}
                        >
                            Hello There!
                        </SplitText>
                    </div>
                </AnimatePresence>
                <AnimatePresence>
                    <div>
                        {secondVisible ? (
                            <SplitText
                                initial={{ y: "100%" }}
                                animate="visible"
                                className="text-7xl font-semibold visible hover:underline cursor-pointer"
                                variants={{
                                    visible: (i) => ({
                                        y: 0,
                                        transition: {
                                            delay: i * 0.25,
                                        },
                                    }),
                                }}
                            >
                                I'm David Ilie
                            </SplitText>
                        ) : (
                            <h1 className="text-7xl font-semibold invisible">
                                I'm David Ilie
                            </h1>
                        )}
                    </div>
                </AnimatePresence>
                <AnimatePresence>
                    <div>
                        {thirdVisible ? (
                            <motion.div
                                variants={fadeIn}
                                initial="hidden"
                                animate="show"
                            >
                                <Socials />
                            </motion.div>
                        ) : (
                            <Socials invisible={true} />
                        )}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
