"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";

import { Button } from "@david/ui";

import CommentForm from "./_components/CommentForm";

const Interactions = () => {
   const params = useParams();
   const { slug } = params;

   const session = useSession();

   if (!session.data) return <div />;

   return !session ? (
      <Button asChild variant="secondary">
         <Link
            href={`/sign-in?returnUrl=${encodeURIComponent(`/blog/${slug}`)}`}
            className="flex items-center gap-2"
         >
            <AiOutlineUser />
            Sign In
         </Link>
      </Button>
   ) : !session.data.user.canComment ? (
      <p className="font-semibold text-red-500">
         You are currently restricted from commenting.
      </p>
   ) : (
      <CommentForm />
   );
};

export default Interactions;
