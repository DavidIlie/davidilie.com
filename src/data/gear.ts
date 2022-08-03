import { FaDesktop, FaNetworkWired } from "react-icons/fa";
import { AiOutlineLaptop } from "react-icons/ai";
import { BiServer } from "react-icons/bi";
import { SiReasonstudios } from "react-icons/si";
import { IconType } from "react-icons";

export interface DeviceProps {
   icon: IconType;
   name: string;
   description: string;
   specs: { prefix: string; suffix: string }[];
}

export const devices: DeviceProps[] = [
   {
      icon: FaDesktop,
      name: "Main Computer",
      description: "Neptune",
      specs: [
         {
            prefix: "CPU",
            suffix: "Intel i9-9900K",
         },
         {
            prefix: "RAM",
            suffix: "32GB DDR4 2666Mhz",
         },
         {
            prefix: "SSD",
            suffix: "Intel 500GB NVME",
         },
         {
            prefix: "SSD1",
            suffix: "Samsung 500GB NVME",
         },
         {
            prefix: "HDD",
            suffix: "3x Seagate 1TB",
         },
         {
            prefix: "GPU",
            suffix: "Nvidia RTX 3090",
         },
         {
            prefix: "OS",
            suffix: "Windows 10 21H2",
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
            suffix: "LG 27QN600-B 1440p 75Hz",
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
      icon: AiOutlineLaptop,
      name: "Main Laptop",
      description: "Macbook Air M2",
      specs: [
         {
            prefix: "CPU",
            suffix: "Apple Silicon M2",
         },
         {
            prefix: "RAM",
            suffix: "24GB Unified Memory",
         },
         {
            prefix: "SSD",
            suffix: "Apple 512GB",
         },
         {
            prefix: "GPU",
            suffix: "Apple Silicon M2",
         },
         {
            prefix: "OS",
            suffix: "macOS Monterey",
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
            prefix: "CPU",
            suffix: "Intel E5-2630 v4 x2",
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
            prefix: "CPU",
            suffix: "Intel E5-2470 v2 x2",
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
