import React from "react";

import { DeviceProps } from "@data/gear";

const Device = ({ device }: { device: DeviceProps }): JSX.Element => {
    return (
        <div className="p-5 mx-auto max-w-md min-w-device h-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hoverItem duration-200">
            <div className="text-4xl flex justify-center">
                {/* 
                //@ts-ignore */}
                <device.icon />
            </div>
            <div className="text-center -mb-2">
                <h1 className="text-2xl">{device.name}</h1>
                <h2 className="text-gray-700 dark:text-gray-300 -mt-1 mb-2">
                    {device.description}
                </h2>
                {device.specs.map((spec, index) => (
                    <h1 key={index}>
                        <span className="font-bold">{spec.prefix}</span>:{" "}
                        {spec.suffix}
                    </h1>
                ))}
            </div>
        </div>
    );
};

export default Device;
