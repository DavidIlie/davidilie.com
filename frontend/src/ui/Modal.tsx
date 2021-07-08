import React from "react";
import ReactModal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Tooltip from "@ui/Tooltip";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        zIndex: 1000,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        borderRadius: 8,
        padding: "30px 40px 20px 40px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1F2937",
        border: "none",
        maxHeight: "80vh",
        width: "50%",
        maxWidth: 500,
    },
};

export default function Modal(props) {
    return (
        <ReactModal style={customStyles} closeTimeoutMS={100} {...props}>
            <div className="flex flex-col w-full">
                <div className="flex justify-end absolute right-3 top-3">
                    <Tooltip content="Close" placement="left">
                        <button
                            className="p-1 text-white"
                            onClick={() => props.onClose()}
                        >
                            <AiOutlineCloseCircle size="1.5rem" />
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div className="focus:outline-none text-white">
                {props.children}
            </div>
        </ReactModal>
    );
}
