export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="flex justify-center flex-grow mt-32 mb-12 sm:px-6 lg:px-8">
         <div className="px-4 text-center sm:px-0">{children}</div>
      </div>
   );
}
