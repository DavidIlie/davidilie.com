import { useState, useEffect } from "react";
import { SplitText } from "@utils/SplitText";
import { AnimatePresence, motion } from "framer-motion";

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
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <SplitText
                        initial={{ y: "100%" }}
                        animate="visible"
                        className="text-4xl mb-1 ml-1"
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
                            className="text-7xl font-semibold"
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
                        <h1 className="text-7xl font-semibold">David Ilie</h1>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
