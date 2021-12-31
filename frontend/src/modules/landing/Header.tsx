import { useState, useEffect } from "react";
import { SplitText } from "@utils/SplitText";
import { AnimatePresence, motion } from "framer-motion";

import Socials from "@components/Socials";

export default function Header() {
    const [secondVisible, setSecondVisible] = useState<boolean>(false);
    const [thirdVisible, setThirdVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>("I'm David Ilie");

    useEffect(() => {
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
        <div className="flex items-center justify-center h-screen space-x-32">
            <div className="text-center text-black dark:text-white">
                <AnimatePresence>
                    <div className="h-10 mt-2 -ml-2 text-center">
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
                                className="visible font-semibold text-7xl header-gradient"
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
                            <h1 className="invisible font-semibold text-7xl">
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
                                <Socials font="1.75" invisible={false} />
                            </motion.div>
                        ) : (
                            <Socials invisible font="1.75" />
                        )}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
