import React from "react";

import { DeviceProps } from "@data/gear";

const Device = ({ device }: { device: DeviceProps }): JSX.Element => {
    return (
        <div className="h-full max-w-md p-5 mx-auto overflow-hidden duration-200 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-md min-w-device dark:bg-gray-800 dark:border-gray-700 hoverItem">
            <div className="flex justify-center text-4xl">
                {/* 
                //@ts-ignore */}
                <device.icon />
            </div>
            <div className="-mb-2 text-center">
                <h1 className="text-2xl">{device.name}</h1>
                <h2 className="mb-2 -mt-1 text-gray-700 dark:text-gray-300">
                    {device.description}
                </h2>
                {device.specs.map((spec, index) => (
                    <h1 key={index}>
                        <span className="font-semibold">{spec.prefix}</span>:{" "}
                        {spec.suffix}
                    </h1>
                ))}
            </div>
        </div>
    );
};

export default Device;
