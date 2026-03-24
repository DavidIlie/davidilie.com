export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="mx-auto mb-12 mt-24 flex flex-1 flex-col max-w-5xl sm:px-6 lg:px-8">
         <div className="px-4 text-center sm:px-0">{children}</div>
      </div>
   );
}
