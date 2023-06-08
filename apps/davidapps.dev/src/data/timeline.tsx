import { ExternalLink } from "ui";
import { TimelineItemProps } from "~/app/components/TimelineItem";

import { FaServer, FaGlobeEurope } from "react-icons/fa";
import { SiProxmox, SiTruenas, SiHomeassistant } from "react-icons/si";

export const items: TimelineItemProps[] = [
   {
      title: "Location",
      description: (
         <p>
            David Ilie Apps Platform has travelled from country to country.
            Moving from my home country of Romania to Spain, and then back to
            Romania after a few years and me in the UK to study, and then
            partially back to Spain. With this in mind I am keeping my platform
            in Romania where it is cost efficient, cold and quiet since I am not
            there most of the time for the platform to be loud. The internet is
            very fast and I always can remote in case there is a problem.
         </p>
      ),
      image: FaGlobeEurope,
      small: true,
   },
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
               <li>
                  <ExternalLink url="https://www.amd.com/en/support/graphics/radeon-500-series/radeon-rx-500-series/radeon-rx-580">
                     AMD RX 580
                  </ExternalLink>{" "}
                  for Plex and Remote Gaming
               </li>
               <li>2x500GB NVME SSDS from Intel and Samsung for VMs</li>
               <li>2x500GB Sata SSDs in ZFS Raid 1 for OS</li>
               <li>
                  8x500GB Sata SSDs via Dell's PERC HBA (4 in ZFS for more VMs,
                  4 for Kubernetes)
               </li>
               <li>Sata controller with 2x500GB Sata SSDS from NAS cache</li>
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
   {
      title: "NAS",
      description: (
         <>
            <p>
               I've always had some sort of NAS running for me and family and it
               has gone through many varations but I've been sticking with
               TrueNAS and I've been really enjoying it. I initially began when
               only the{" "}
               <span className="px-1 font-mono text-yellow-500 rounded-md bg-yellow-500/10">
                  core
               </span>{" "}
               variant.
            </p>
            <br />
            <p>
               Now I use TrueNAS scale in a virtualized environment on Nucleus
               with that HBA card and that Sata controller passed through and an
               entire Ethernet port for the best performance for both my movies,
               music, and also my workloads.
            </p>
            <br />
            <p>
               On my HP Microserver Gen 8 I have installed at my house in Spain
               and I have some folders and backups replicated to it overnight
               using a VPN.
            </p>
         </>
      ),
      image: SiTruenas,
      link: "https://www.truenas.com/",
      small: true,
   },
   {
      title: "Kubernetes",
      description: (
         <>
            <p>
               Some people might consider Kubernetes as an abstraction or a
               waste of resources but in my opinion I like it because of how fun
               & interesting it is to configure and maintain. I've posted a
               video on my{" "}
               <ExternalLink url="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA">
                  YouTube Channel
               </ExternalLink>{" "}
               regarding my{" "}
               <a className="text-blue-500 duration-150 cursor-pointer hover:text-blue-600">
                  first couple clusters
               </a>
               .
            </p>
            <br />
            <p>
               My current infastructure is different because it is managed only
               through code using
               <ExternalLink url="https://fluxcd.io/">Flux</ExternalLink>which
               makes it better than my previous Rancher based installations
               which I wouldn't rememember what I did to get it running, making
               it really difficult to redeploy. Thanks to the{" "}
               <ExternalLink url="https://k8s-at-home.com/">
                  k8s-at-home
               </ExternalLink>{" "}
               and typically it's not recommended to use the same server for all
               my worker and master nodes, but that is why I have different
               types of disks for each one for good IOPS.
            </p>
         </>
      ),
      image: "https://github.com/DavidIlie/davidilie.com/assets/47594764/e98b6d21-46fd-4c49-8b7d-0fa586ad8b1c",
      link: "https://github.com/DavidIlie/home-cluster",
   },
   {
      title: "Home Automation",
      description: (
         <>
            <p>
               I've recently had the ability to discover Home Assistant and
               automation at my two homes. I like how well it is integrated with
               my computer and also Apple Homekit.
            </p>
            <br />
            <p>
               I have Home Assistant running on Nucleus and I am using it to
               manage any iOT devices that are present.
            </p>
            <br />
            <p>
               At my house in Spain, I have Home Assistant running on a
               Raspberry Pi 3 connected to an iKEA gateway and other devices to
               manage lights, outlets, TVs, etc. The way I connect to it is by
               running a VPN server on my HP Microserver Gen 8 and then having a
               VM connect to it and forward it to my kubernetes cluster so I can
               access it from the internet and use external services.
            </p>
         </>
      ),
      image: SiHomeassistant,
      link: "https://www.home-assistant.io/",
      small: true,
   },
];
