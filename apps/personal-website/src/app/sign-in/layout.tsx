import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
   title: "Sign In",
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const session = await getServerAuthSession();

   if (session) return redirect("/");

   return (
      <div className="flex flex-grow items-center justify-center py-12 sm:px-6 lg:px-8">
         <div className="w-full sm:mx-auto sm:max-w-md">{children}</div>
      </div>
   );
}
