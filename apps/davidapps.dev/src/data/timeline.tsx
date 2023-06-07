import { ExternalLink } from "ui";
import { TimelineItemProps } from "~/app/components/TimelineItem";

import { FaServer } from "react-icons/fa";
import { SiProxmox } from "react-icons/si";

export const items: TimelineItemProps[] = [
   {
      title: "Servers",
      description: (
         <p>
            Throughout the years I have been given access to old enterprise
            server hardware, ranging from my very first
            <ExternalLink url="https://www.serversdirect.co.uk/p/1039108/hpe-proliant-microserver-gen8-intel-celeron-g1610t-dual-core-.30ghz-mb-4-x-non-hotplug-">
               HP Microserver G8
            </ExternalLink>
            (which I still actually use today) to a{" "}
            <ExternalLink url="https://www.itcreations.com/hp/hpe-proliant-dl360e-gen8-server">
               HP dl360e G8
            </ExternalLink>
            server, to then using the cloud while moving, to now using my{" "}
            <ExternalLink url="https://www.itcreations.com/hp/hpe-proliant-dl360e-gen8-server">
               Dell R730
            </ExternalLink>
            , which uses the HBA card from my Gen 8 server and drive bays from a
            handed down HP Gen 6 Server.
         </p>
      ),
      image: FaServer,
      small: true,
   },
   {
      title: "Nucleus",
      description: (
         <div>
            <p>My current server is a Dell R730, named Nucleus:</p>
            <ul className="mx-4 list-disc marker:text-blue-500">
               <li>
                  Two
                  <ExternalLink url="https://www.intel.co.uk/content/www/uk/en/products/sku/92981/intel-xeon-processor-e52630-v4-25m-cache-2-20-ghz/specifications.html">
                     Intel E5-2630 v4
                  </ExternalLink>{" "}
                  CPUs
               </li>
               <li>224GB ECC DDR4 RAM</li>
               <li>2x500GB Sata SSDs in ZFS Raid 1 for OS</li>
               <li>
                  8x500GB Sata SSDs via Dell's PERC HBA (4 in ZFS for VMs, 4 for
                  Kubernetes)
               </li>
               <li>
                  <ExternalLink url="https://www.amd.com/en/support/graphics/radeon-500-series/radeon-rx-500-series/radeon-rx-580">
                     AMD RX 580
                  </ExternalLink>{" "}
                  for Plex and Remote Gaming
               </li>
               <li>2x500GB NVME SSDS from Intel and Samsung for more VMs</li>
               <li>
                  1x4TB 3x1TB HHDs on a Gen 6 HP Server backplane through a HP
                  P420i HBA controller.
               </li>
            </ul>
            That's a lot of overkill hardware but my server is composed of
            hardware/servers/computers that I've had laying around and it was
            better to put it all in one.
         </div>
      ),
      image: "/server.gif",
   },
   {
      title: "Hypervisor",
      description: (
         <p>
            Proxmox has been my choice as the main host operating system and
            hypervisor for the sole reason of <strong>reliability</strong>. I
            know it can withstand long amounts of uptime and has the best VM
            performance. I used to use its LXC container feature but not
            anymore, you'll see why as you continue reading. I am using a RAID 1
            for my bootdrive as the only problems I've had are with the drives
            themselves so I want ultimate realibility while I am away.
         </p>
      ),
      image: SiProxmox,
      link: "https://www.proxmox.com/en/",
      small: true,
   },
];
