import React from "react";

import { DeviceProps } from "@data/gear";

const Device = ({ device }: { device: DeviceProps }): JSX.Element => {
    return (
        <div className="p-5 mx-auto max-w-md min-w-1/2 h-full bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden hoverItem duration-200 cursor-pointer">
            <div className="text-4xl flex justify-center">
                {/* 
                //@ts-ignore */}
                <device.icon />
            </div>
            <div className="text-center -mb-2">
                <h1 className="text-2xl">{device.name}</h1>
                <h2 className="text-gray-300 -mt-1 mb-2">
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
