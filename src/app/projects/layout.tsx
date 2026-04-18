export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="mx-auto mt-24 mb-12 flex max-w-5xl flex-1 flex-col sm:px-6 lg:px-8">
         <div className="px-4 text-center sm:px-0">{children}</div>
      </div>
   );
}
