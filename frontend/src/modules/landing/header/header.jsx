import { useState, useEffect } from "react";
import { SplitText } from "@utils/SplitText";
import { AnimatePresence } from "framer-motion";

export default function Header() {
    const [secondVisible, setSecondVisible] = useState(false);
    const [thirdVisible, setThirdVisible] = useState(false);
    useEffect(async () => {
        setTimeout(() => {
            setSecondVisible(true);
            setTimeout(() => {
                setThirdVisible(true);
            }, 1000);
        }, 500);
    }, []);
    return (
        <div className="h-full flex justify-center items-center space-x-32 bg-background">
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
                    <div className="h-15">
                        {secondVisible ? (
                            <SplitText
                                initial={{ y: "100%" }}
                                animate="visible"
                                className="text-7xl font-semibold visible"
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
                            <SplitText
                                initial={{ y: "100%" }}
                                animate="visible"
                                className="mb-1 text-3xl font-semibold visible"
                                variants={{
                                    visible: (i) => ({
                                        y: 0,
                                        transition: {
                                            delay: i * 0.25,
                                        },
                                    }),
                                }}
                            >
                                a 14 year old Web Dev
                            </SplitText>
                        ) : (
                            <h1 className="text-3xl font-semibold invisible">
                                a 14 year old Web Dev
                            </h1>
                        )}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
