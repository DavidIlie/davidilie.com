export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="flex flex-grow items-center justify-center sm:px-6 lg:px-8">
         <div className="container mx-auto mt-28 max-w-3xl">{children}</div>
      </div>
   );
}
