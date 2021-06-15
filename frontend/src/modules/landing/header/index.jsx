import { useState, useEffect } from "react";
import axios from "axios";

import { SplitText } from "@utils/SplitText";
import { AnimatePresence, motion } from "framer-motion";

import Typewriter from "typewriter-effect";

export default function Header() {
    const [data, setData] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(async () => {
        const request = await axios.get(
            "https://davidilie.com/api/agenda/job/statistics"
        );
        setData(request.data);

        setTimeout(() => {
            setVisible(true);
        }, 500);
    }, []);
    return (
        <div className="h-full flex justify-center items-center space-x-32">
            <div>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
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
                            Hey! My name is
                        </SplitText>
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={visible ? "visible" : "invisible"}
                    >
                        {visible ? (
                            <SplitText
                                initial={{ y: "100%" }}
                                animate="visible"
                                className="text-7xl font-semibold tracking-tight"
                                variants={{
                                    visible: (i) => ({
                                        y: 0,
                                        transition: {
                                            delay: i * 0.25,
                                        },
                                    }),
                                }}
                            >
                                David Ilie
                            </SplitText>
                        ) : (
                            <h1 className="text-7xl font-semibold tracking-tight">
                                David Ilie
                            </h1>
                        )}
                    </motion.div>
                </AnimatePresence>
                {data !== false ? (
                    <div className="text-3xl">
                        <Typewriter
                            options={{
                                strings: [
                                    `Subscribers: ${data.subscribers}`,
                                    `Views: ${data.views}`,
                                    `Videos: ${data.videos}`,
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
