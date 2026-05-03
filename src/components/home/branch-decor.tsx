import { cn } from "~/lib/utils";

/**
 * Minimal generative-stroke decoration. One faint brand-tinted SVG branch
 * anchored to a corner of the viewport. Replaces the multicolour floating
 * shape pattern on `/`.
 *
 * Intentionally static — no JS, no animation. The shape is the signal.
 */
export const BranchDecor: React.FC<{
   corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
   className?: string;
}> = ({ corner, className }) => {
   const positionClass = {
      "top-left": "top-0 left-0",
      "top-right": "top-0 right-0 -scale-x-100",
      "bottom-left": "bottom-0 left-0 -scale-y-100",
      "bottom-right": "bottom-0 right-0 -scale-100",
   }[corner];

   return (
      <svg
         aria-hidden
         viewBox="0 0 320 320"
         className={cn(
            "pointer-events-none absolute h-[260px] w-[260px] text-brand opacity-[var(--branch-decor-opacity)] sm:h-[360px] sm:w-[360px]",
            positionClass,
            className,
         )}
         style={
            {
               "--branch-decor-opacity": "0.07",
            } as React.CSSProperties
         }
         fill="none"
         stroke="currentColor"
         strokeWidth="1"
         strokeLinecap="round"
      >
         {/* Trunk */}
         <path d="M0 0 C 40 50, 80 80, 140 110" />
         {/* Primary branches */}
         <path d="M40 50 C 60 70, 80 70, 100 60" />
         <path d="M80 80 C 110 100, 130 110, 150 100" />
         <path d="M140 110 C 170 130, 200 150, 240 160" />
         <path d="M120 100 C 145 130, 160 160, 175 200" />
         {/* Secondary twigs */}
         <path d="M100 60 C 110 50, 120 45, 130 50" />
         <path d="M150 100 C 160 90, 170 85, 180 90" />
         <path d="M240 160 C 260 175, 270 190, 280 220" />
         <path d="M175 200 C 190 220, 200 240, 210 270" />
         <path d="M210 270 C 220 280, 230 285, 240 290" />
         {/* Tip dots */}
         <circle cx="130" cy="50" r="1.5" fill="currentColor" />
         <circle cx="180" cy="90" r="1.5" fill="currentColor" />
         <circle cx="280" cy="220" r="2" fill="currentColor" />
         <circle cx="240" cy="290" r="1.5" fill="currentColor" />
      </svg>
   );
};
