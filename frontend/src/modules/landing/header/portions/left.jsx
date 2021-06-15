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
                <div>
                    <SplitText
                        initial={{ y: "100%" }}
                        animate="visible"
                        className="text-4xl ml-1"
                        variants={{
                            visible: (i) => ({
                                y: 0,
                                transition: {
                                    delay: i * 0.1,
                                },
                            }),
                        }}
                    >
                        Hello There! I'm
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
                            David Ilie
                        </SplitText>
                    ) : (
                        <h1 className="text-7xl font-semibold invisible">
                            David Ilie
                        </h1>
                    )}
                </div>
            </AnimatePresence>
        </div>
    );
}
