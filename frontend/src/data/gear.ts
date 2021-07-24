import React from "react";

import { FaDesktop, FaNetworkWired } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineLaptop } from "react-icons/ai";
import { BiServer } from "react-icons/bi";

interface Specs {
    prefix: string;
    suffix: string;
}

export interface DeviceProps {
    icon: React.ReactNode;
    name: string;
    description: string;
    specs: Specs[];
}

export const devices: DeviceProps[] = [
    {
        icon: FaDesktop,
        name: "Main PC",
        description: "Neptune",
        specs: [
            {
                prefix: "CPU",
                suffix: "Intel i9-9900k",
            },
            {
                prefix: "GPU",
                suffix: "Nvidia RTX 2080",
            },
            {
                prefix: "RAM",
                suffix: "32GB DDR4 2666Mhz",
            },
            {
                prefix: "SSD",
                suffix: "Samsung 500GB NVME SSD",
            },
            {
                prefix: "HDD",
                suffix: "Seagate 2TB SSHD",
            },
            {
                prefix: "OS",
                suffix: "Windows 11 Dev Preview",
            },
        ],
    },
    {
        icon: AiOutlineLaptop,
        name: "Main Laptop",
        description: "Mars",
        specs: [
            {
                prefix: "Model",
                suffix: "Dell XPS 13 9310",
            },
            {
                prefix: "CPU",
                suffix: "Intel i7-1185G7",
            },
            {
                prefix: "RAM",
                suffix: "16GB LPDDR4X 4267Mhz",
            },
            {
                prefix: "SSD",
                suffix: "KIOXIA 1TB NVME",
            },
            {
                prefix: "Display",
                suffix: "16:10 1920x1200",
            },
            {
                prefix: "OS",
                suffix: "Windows 11 Dev Preview",
            },
        ],
    },
    {
        icon: FiSmartphone,
        name: "Phone",
        description: "David's Phone",
        specs: [
            {
                prefix: "Model",
                suffix: "Xiaomi Mi 10",
            },
            {
                prefix: "CPU",
                suffix: "Qualcomm Snapdragon 865",
            },
            {
                prefix: "RAM",
                suffix: "16GB",
            },
            {
                prefix: "GPU",
                suffix: "Adreno 650",
            },
            {
                prefix: "Storage",
                suffix: "128GB Flash",
            },
            {
                prefix: "OS",
                suffix: "MIUI 12",
            },
        ],
    },
    {
        icon: FaNetworkWired,
        name: "Networking",
        description: "Home Network",
        specs: [
            {
                prefix: "Router",
                suffix: "Huawei EG8145V5",
            },
            {
                prefix: "Network Type",
                suffix: "Fiber Optic",
            },
            {
                prefix: "Protection",
                suffix: "Cloudflare",
            },
            {
                prefix: "Switch",
                suffix: "Dell PowerConnect 2848",
            },
            {
                prefix: "DL Speed",
                suffix: "600Mbit/s",
            },
            {
                prefix: "Up Speed",
                suffix: "600Mbit/s",
            },
        ],
    },
];

export const infastructure: DeviceProps[] = [
    {
        icon: BiServer,
        name: "Server",
        description: "Nucleus",
        specs: [
            {
                prefix: "Model",
                suffix: "Dell Poweredge R730",
            },
            {
                prefix: "CPU1",
                suffix: "Intel E5-2630 v4",
            },
            {
                prefix: "CPU2",
                suffix: "Intel E5-2630 v4",
            },
            {
                prefix: "RAM",
                suffix: "224GB DDR4 ECC",
            },
            {
                prefix: "Storage",
                suffix: "1.5TB SSD Array",
            },
            {
                prefix: "OS",
                suffix: "Debian 11 (Proxmox VE 7)",
            },
        ],
    },
    {
        icon: BiServer,
        name: "Server",
        description: "Citrus",
        specs: [
            {
                prefix: "Model",
                suffix: "HP Dl360e G8",
            },
            {
                prefix: "CPU1",
                suffix: "Intel E5-2470 v2",
            },
            {
                prefix: "CPU2",
                suffix: "Intel E5-2470 v2",
            },
            {
                prefix: "RAM",
                suffix: "128GB DDR3 ECC",
            },
            {
                prefix: "Storage",
                suffix: "1.5TB SSD Array",
            },
            {
                prefix: "OS",
                suffix: "Debian 11 (Proxmox VE 7)",
            },
        ],
    },
    {
        icon: AiOutlineLaptop,
        name: "Server/Laptop",
        description: "Plasma",
        specs: [
            {
                prefix: "Model",
                suffix: "Xiaomi Gaming",
            },
            {
                prefix: "CPU",
                suffix: "Intel i7-8750H",
            },
            {
                prefix: "RAM",
                suffix: "16GB DDR4",
            },
            {
                prefix: "Storage",
                suffix: "500GB SSD",
            },
            {
                prefix: "GPU",
                suffix: "Nvidia GTX 1060",
            },
            {
                prefix: "OS",
                suffix: "Debian 11 (Proxmox VE 7)",
            },
        ],
    },
];
