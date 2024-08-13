export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="mx-auto mb-12 mt-24 flex max-w-5xl flex-grow justify-center sm:px-6 lg:px-8">
         <div className="px-4 text-center sm:px-0">{children}</div>
      </div>
   );
}
