"use client";

import React from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
   ssr: false,
   loading: () => (
      <div className="h-96 w-full animate-pulse rounded-lg bg-gray-800"></div>
   ),
});

export const GlobeClient = () => {
   return (
      <Globe
         globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
         width={600}
         height={600}
         backgroundColor="rgba(0,0,0,0)"
         showAtmosphere={true}
         atmosphereColor="#3b82f6"
         atmosphereAltitude={0.1}
         showGraticules={false}
         enablePointerInteraction={true}
         animateIn={true}
         waitForGlobeReady={true}
      />
   );
};
