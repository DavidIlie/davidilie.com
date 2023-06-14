export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="flex items-center justify-center flex-grow sm:px-6 lg:px-8">
         <div className="container max-w-3xl mx-auto mt-28">{children}</div>
      </div>
   );
}
