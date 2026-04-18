export default function MusicLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="mx-auto mt-28 mb-16 flex max-w-5xl flex-1 flex-col px-4 sm:mt-24 sm:px-6 lg:px-8">
         {children}
      </div>
   );
}
