import Link from "next/link";
//@ts-ignore
import { Fade, Slide } from "react-awesome-reveal";

import { Button } from "~/components/ui/button";
import {
   DockerIcon,
   NextjsIcon,
   PrismaIcon,
   TailwindCSSIcon,
   TypeScriptIcon,
} from "~/components/ui/icons";
import { GlobeClient } from "./globe";

export const metadata = {
   title: "Developer Portfolio",
   description:
      "Launch your website in 1 week. Professional web development with modern technologies. From simple websites to complex web applications - fast execution, zero compromises on quality.",
   keywords: [
      "web developer",
      "Next.js developer",
      "React developer",
      "TypeScript developer",
      "full-stack developer",
      "website development",
      "web application development",
      "modern web development",
      "fast web development",
      "professional web developer",
      "David Ilie developer",
   ],
   openGraph: {
      url: "https://davidilie.com/developer-portfolio",
      title: "Professional Web Development Services | David Ilie",
      description:
         "Launch your website in 1 week. Modern web development with React, Next.js, and TypeScript. Fast execution, professional quality, full source code ownership.",
      type: "website",
      siteName: "David Ilie",
      locale: "en-US",
      images: [
         {
            url: "/static/developer-portfolio-og.png",
            width: 1200,
            height: 630,
            alt: "David Ilie Developer Portfolio - Professional Web Developer",
            type: "image/png",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Professional Web Development Services | David Ilie",
      description:
         "Launch your website in 1 week. Modern web development with React, Next.js, and TypeScript.",
      site: "@MrDavidIlie",
      creator: "@MrDavidIlie",
      images: ["/static/developer-portfolio-og.png"],
   },
};

const DeveloperPortfolio = () => {
   return (
      <>
         <div className="relative flex min-h-[90vh] items-center overflow-hidden text-white">
            <div className="container relative z-10 mx-auto mt-24 max-w-6xl px-4 sm:mt-0">
               <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div>
                     <Fade direction="up" triggerOnce cascade>
                        <div className="mb-8 inline-block rounded-full border border-blue-500/20 bg-blue-600/10 px-4 py-2">
                           <span className="text-sm font-medium text-blue-400">
                              Stop Waiting
                           </span>
                        </div>
                        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 dark:text-white md:text-6xl lg:text-7xl">
                           Launch Your Website
                           <br />
                           <span className="gradient-text">in 1 Week</span>
                        </h1>
                        <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                           Turn your idea into a live website customers can use.
                           Fast execution, zero compromises on quality.
                        </p>
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                           <Button
                              asChild
                              size="lg"
                              className="bg-blue-600 px-8 py-4 text-lg text-white hover:bg-blue-700"
                           >
                              <Link href="mailto:david@davidilie.com">
                                 📅 Book My Spot →
                              </Link>
                           </Button>
                           <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="px-8 py-4 text-lg text-black hover:bg-gray-800 dark:border-gray-600 dark:text-white"
                           >
                              <Link href="#pricing">💡 View Pricing</Link>
                           </Button>
                        </div>
                     </Fade>
                  </div>
                  <div className="hidden justify-center md:flex lg:order-2 lg:justify-end">
                     <div className="h-96 w-full max-w-lg lg:h-[500px]">
                        <GlobeClient />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* <div className="bg-gray-50 py-16 dark:bg-gray-900">
            <div className="container mx-auto px-4">
               <Fade direction="up" triggerOnce>
                  <div className="mb-12 text-center">
                     <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        Trusted by Entrepreneurs Worldwide
                     </h2>
                     <p className="text-lg text-gray-600 dark:text-gray-300">
                        See what clients say about working with me
                     </p>
                  </div>
               </Fade>
               <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Slide cascade triggerOnce duration={400}>
                     <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex items-center space-x-3">
                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                              <span className="text-sm font-bold text-white">
                                 S
                              </span>
                           </div>
                           <div>
                              <p className="font-semibold">Sarah</p>
                              <p className="text-sm text-gray-500">
                                 E-commerce Owner
                              </p>
                           </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                           &quot;Amazing website, exactly what I wanted&quot;
                        </p>
                     </div>
                     <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex items-center space-x-3">
                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                              <span className="text-sm font-bold text-white">
                                 M
                              </span>
                           </div>
                           <div>
                              <p className="font-semibold">Mike</p>
                              <p className="text-sm text-gray-500">
                                 Startup Founder
                              </p>
                           </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                           &quot;Lightning fast delivery&quot;
                        </p>
                     </div>
                     <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex items-center space-x-3">
                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                              <span className="text-sm font-bold text-white">
                                 A
                              </span>
                           </div>
                           <div>
                              <p className="font-semibold">Alex</p>
                              <p className="text-sm text-gray-500">
                                 Tech Startup
                              </p>
                           </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                           &quot;I&apos;m going to keep working with you&quot;
                        </p>
                     </div>
                  </Slide>
               </div>
            </div>
         </div> */}
         <div className="bg-white py-20 dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl px-4">
               <Slide cascade triggerOnce duration={500}>
                  <div className="grid gap-8 md:grid-cols-3">
                     <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                           <span className="text-2xl text-white">🚀</span>
                        </div>
                        <h3 className="mb-4 text-xl font-bold">
                           Fast Delivery
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Get your website delivered in exactly 1 week as
                           promised.
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-green-600">
                           <span className="text-2xl text-white">💰</span>
                        </div>
                        <h3 className="mb-4 text-xl font-bold">Fixed Price</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           One transparent price with no hidden fees or
                           surprises.
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-600">
                           <span className="text-2xl text-white">👑</span>
                        </div>
                        <h3 className="mb-4 text-xl font-bold">
                           Full Ownership
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           You own 100% of the source code and all assets.
                        </p>
                     </div>
                  </div>
               </Slide>
            </div>
         </div>
         <div className="bg-gray-50 py-20 dark:bg-gray-900">
            <div className="container mx-auto px-4">
               <Fade direction="up" triggerOnce>
                  <div className="mb-16 text-center">
                     <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                        Built with Modern Technologies
                     </h2>
                     <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                        I use the best tools in the industry to deliver your
                        website fast without compromising on quality or
                        scalability.
                     </p>
                  </div>
               </Fade>
               <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <Slide cascade triggerOnce duration={400}>
                     <div className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-black">
                           <NextjsIcon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Next.js</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Lightning-fast React framework for production-ready
                           applications.
                        </p>
                     </div>
                     <div className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-800">
                        <TypeScriptIcon className="mb-4 h-12 w-12" />
                        <h3 className="mb-2 text-xl font-bold">TypeScript</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Type-safe development for bug-free code and better
                           maintainability.
                        </p>
                     </div>
                     <div className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-800">
                        <TailwindCSSIcon className="mb-4 h-12 w-12" />
                        <h3 className="mb-2 text-xl font-bold">Tailwind CSS</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Modern styling framework for beautiful, responsive
                           designs.
                        </p>
                     </div>
                     <div className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-800">
                        <DockerIcon className="mb-4 h-12 w-12" />
                        <h3 className="mb-2 text-xl font-bold">Docker</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Deploy with Vercel or custom Docker containers on
                           self-hosted servers.
                        </p>
                     </div>
                     <div className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                           <PrismaIcon className="h-8 w-8" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Prisma</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Modern database toolkit with type-safe queries and
                           migrations.
                        </p>
                     </div>
                     <div className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                           <span className="text-xl font-bold text-white">
                              📊
                           </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                           Plausible Analytics
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Privacy-friendly analytics without cookies or
                           tracking.
                        </p>
                     </div>
                  </Slide>
               </div>
            </div>
         </div>
         <div className="bg-gray-900 py-10 text-white">
            <div className="container mx-auto px-4 text-center">
               <Fade triggerOnce>
                  <div className="mb-4 text-6xl text-blue-400">&quot;</div>
                  <blockquote className="mx-auto mb-8 max-w-4xl text-2xl font-medium leading-relaxed md:text-3xl">
                     I have never worked with someone who understands and
                     executes exactly what I want, I am impressed.
                  </blockquote>
                  <div className="text-lg">
                     <div className="font-bold">ALEX</div>
                     <div className="text-gray-400">Mercedes Engineer</div>
                  </div>
               </Fade>
            </div>
         </div>
         <div id="pricing" className="bg-white py-20 dark:bg-gray-800">
            <div className="container mx-auto px-4">
               <Fade direction="up" triggerOnce>
                  <div className="mb-16 text-center">
                     <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                        Simple, Transparent Pricing
                     </h2>
                     <p className="text-xl text-gray-600 dark:text-gray-300">
                        Choose the perfect plan for your project
                     </p>
                  </div>
               </Fade>
               <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                  <Slide cascade triggerOnce duration={400}>
                     <div className="relative rounded-2xl bg-gray-50 p-8 dark:bg-gray-900">
                        <div className="mb-8 text-center">
                           <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                              SIMPLE WEBSITE
                           </h3>
                           <div className="mb-4 text-4xl font-bold">$499</div>
                           <p className="text-gray-600 dark:text-gray-300">
                              Perfect for simple showcase websites without
                              advanced features.
                           </p>
                        </div>
                        <ul className="mb-8 space-y-3">
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Modern responsive design
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Up to 5 pages
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Contact forms
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Basic SEO setup
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>1
                              week delivery
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>2
                              weeks support
                           </li>
                        </ul>
                        <Button asChild className="w-full" variant="outline">
                           <Link href="mailto:david@davidilie.com?subject=Simple Website Project">
                              Get Started
                           </Link>
                        </Button>
                     </div>
                     <div className="relative scale-105 transform rounded-2xl bg-blue-600 p-8 text-white shadow-2xl">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
                           <span className="rounded-full bg-gradient-to-r from-blue-400 to-sky-500 px-4 py-1 text-sm font-medium text-black">
                              MOST POPULAR
                           </span>
                        </div>
                        <div className="mb-8 text-center">
                           <h3 className="mb-2 text-lg font-semibold text-blue-200">
                              COMPLETE WEB APP
                           </h3>
                           <div className="mb-1 text-4xl font-bold">$1499</div>
                           <div className="mb-4 text-sm text-blue-200">
                              one-time
                           </div>
                           <p className="text-blue-100">
                              Everything you need to launch your web application
                           </p>
                        </div>
                        <ul className="mb-8 space-y-3 text-blue-50">
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Complete web app development
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              1-week delivery guarantee
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Modern tech stack
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Mobile responsive design
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Database setup & hosting
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Authentication system
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Admin dashboard
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>1
                              month support included
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-400">✓</span>
                              Source code ownership
                           </li>
                        </ul>
                        <Button
                           asChild
                           className="w-full bg-white text-blue-600 hover:bg-gray-100"
                        >
                           <Link href="mailto:david@davidilie.com?subject=Complete Web App Project">
                              Start Your Project
                           </Link>
                        </Button>
                     </div>
                     <div className="relative rounded-2xl bg-gray-50 p-8 dark:bg-gray-900">
                        <div className="mb-8 text-center">
                           <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                              CUSTOM REQUEST
                           </h3>
                           <div className="mb-4 text-4xl font-bold">
                              On Demand
                           </div>
                           <p className="text-gray-600 dark:text-gray-300">
                              For specific or complex requirements that need
                              custom solutions.
                           </p>
                        </div>
                        <ul className="mb-8 space-y-3">
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Custom feature development
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Complex integrations
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Advanced functionality
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Scalable architecture
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Priority support
                           </li>
                           <li className="flex items-center">
                              <span className="mr-3 text-green-500">✓</span>
                              Team consultation
                           </li>
                        </ul>

                        <Button asChild className="w-full" variant="outline">
                           <Link href="mailto:david@davidilie.com?subject=Custom Development Project">
                              Contact Me
                           </Link>
                        </Button>
                     </div>
                  </Slide>
               </div>
            </div>
         </div>

         {/* Guarantees */}
         <div className="bg-gray-50 py-20 dark:bg-gray-900">
            <div className="container mx-auto px-4">
               <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
                  <Fade direction="left" triggerOnce>
                     <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                           <span className="text-2xl text-white">⏰</span>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                           1-week delivery guarantee
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           Delivery guaranteed in 1 week or money back
                        </p>
                     </div>
                  </Fade>

                  <Fade direction="right" triggerOnce>
                     <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                           <span className="text-2xl text-white">💻</span>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                           Source code included
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           You own 100% of the source code and all assets
                        </p>
                     </div>
                  </Fade>
               </div>
            </div>
         </div>
      </>
   );
};

export default DeveloperPortfolio;
