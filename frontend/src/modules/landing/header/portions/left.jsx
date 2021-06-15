import { useState, useEffect } from "react";
import { SplitText } from "@utils/SplitText";
import { AnimatePresence } from "framer-motion";

export default function LeftPortion() {
    const [visible, setVisible] = useState(false);
    useEffect(async () => {
        setTimeout(() => {
            setVisible(true);
        }, 500);
    }, []);
    return (
        <div>
            <AnimatePresence>
                <div className="h-8 text-center -ml-2">
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
                    {visible ? (
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
        </div>
    );
}
