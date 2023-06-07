import { ExternalLink } from "ui";
import { TimelineItemProps } from "~/app/components/TimelineItem";

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
      imageSrc: "/servers.webp",
   },
   {
      title: "Nucleus",
      description: (
         <p>
            My current server is a Dell R730, named Nucleus, with two
            <ExternalLink url="https://www.intel.co.uk/content/www/uk/en/products/sku/92981/intel-xeon-processor-e52630-v4-25m-cache-2-20-ghz/specifications.html">
               Intel E5-2630 v4
            </ExternalLink>{" "}
            CPUs, 224GB ECC DDR4 RAM, 8 500GB Sata SSDs via Dell's PERC HBA (4
            in ZFS for VMs, 4 for Kubernetes), an{" "}
            <ExternalLink url="https://www.amd.com/en/support/graphics/radeon-500-series/radeon-rx-500-series/radeon-rx-580">
               AMD RX 580
            </ExternalLink>{" "}
            for Plex and Remote Gaming and two 500GB NVME SSDS from Intel and
            Samsung for more VMs. 1x4TB 3x1TB HHDs on a Gen 6 HP Server
            backplane through a HP P420i HBA controller. That's a lot of
            overkill hardware but my server is composed of
            hardware/servers/computers that I've had laying around and it was
            better to put it all in one.
         </p>
      ),
      imageSrc: "/server.gif",
   },
   {
      title: "Hypervisor",
      description: "Proxmox has been ",
      imageSrc: "/proxmox.png",
      link: "https://www.proxmox.com/en/",
      small: true,
   },
];
