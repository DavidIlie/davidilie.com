export default function MusicLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="mx-auto mb-16 mt-28 max-w-5xl px-4 sm:mt-24 sm:px-6 lg:px-8">
         {children}
      </div>
   );
}
