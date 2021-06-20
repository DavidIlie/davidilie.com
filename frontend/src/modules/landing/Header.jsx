import { useState, useEffect } from "react";
import { SplitText } from "@utils/SplitText";
import { AnimatePresence, motion } from "framer-motion";

import Socials from "@components/Socials";

export default function Header() {
    const [secondVisible, setSecondVisible] = useState(false);
    const [thirdVisible, setThirdVisible] = useState(false);
    const [name, setName] = useState("I'm David Ilie");

    useEffect(async () => {
        setTimeout(() => {
            setSecondVisible(true);
            setTimeout(() => {
                setThirdVisible(true);
            }, 500);
        }, 500);

        const width = window.innerWidth;
        if (width > 500) {
            setName("I'm David Ilie");
        } else {
            setName("I'm David");
        }

        window.addEventListener("resize", () => {
            const width = window.innerWidth;
            if (width > 500) {
                setName("I'm David Ilie");
            } else {
                setName("I'm David");
            }
        });
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
        <div className="h-screen flex justify-center items-center space-x-32">
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
                                {name}
                            </SplitText>
                        ) : (
                            <h1 className="text-7xl font-semibold invisible">
                                {name}
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
                                <Socials font={3} />
                            </motion.div>
                        ) : (
                            <Socials invisible font={3} />
                        )}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
