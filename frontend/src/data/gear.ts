import React from "react";

import { FaDesktop, FaNetworkWired } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineLaptop } from "react-icons/ai";
import { BiServer } from "react-icons/bi";
import { SiReasonstudios } from "react-icons/si";

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
        icon: AiOutlineLaptop,
        name: "Main Computer",
        description: "Dell XPS 13 9310",
        specs: [
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
                prefix: "GPU",
                suffix: "Nvidia RTX 2080",
            },
            {
                prefix: "OS",
                suffix: "Windows 11 21H1",
            },
            {
                prefix: "OS2",
                suffix: "Ubuntu 20.04",
            },
            {
                prefix: "OS3",
                suffix: "ChromeOS 96",
            },
        ],
    },
    {
        icon: SiReasonstudios,
        name: "Equipment",
        description: "How I work day-to-day",
        specs: [
            {
                prefix: "Monitor",
                suffix: "Lenovo Y27GQ-25 1440p 240Hz",
            },
            {
                prefix: "Monitor",
                suffix: "2x LG 27QN600-B 1440p 75Hz",
            },
            {
                prefix: "Keyboard",
                suffix: "Keychron K2 Brown",
            },
            {
                prefix: "Mouse",
                suffix: "Razer Viper Elite",
            },
            {
                prefix: "Microphone",
                suffix: "Shure SM7B",
            },
            {
                prefix: "Audio Interface",
                suffix: "GoXLR",
            },
            {
                prefix: "Camera",
                suffix: "Sony FDR-AXP55",
            },
        ],
    },
    {
        icon: FaNetworkWired,
        name: "Networking",
        description: "Home Network",
        specs: [
            {
                prefix: "Modem",
                suffix: "Huawei EG8145V5",
            },
            {
                prefix: "Router/Firewall",
                suffix: "pfSense",
            },
            {
                prefix: "Switch",
                suffix: "Dell PowerConnect 2848",
            },
            {
                prefix: "Access Points",
                suffix: "2x Xiaomi AX3600 Wi-Fi 6",
            },
            {
                prefix: "DL Speed",
                suffix: "~520Mbit/s",
            },
            {
                prefix: "Up Speed",
                suffix: "~508Mbit/s",
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
        icon: FaDesktop,
        name: "Server",
        description: "Neptune",
        specs: [
            {
                prefix: "CPU",
                suffix: "Intel i9-9900k",
            },
            {
                prefix: "GPU",
                suffix: "Nvidia GTX 1070 Ti",
            },
            {
                prefix: "RAM",
                suffix: "32GB DDR4 2666Mhz",
            },
            {
                prefix: "SSD",
                suffix: "2x Samsung 500GB NVME",
            },
            {
                prefix: "HDD",
                suffix: "3x Seagate 1TB SSHD",
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
