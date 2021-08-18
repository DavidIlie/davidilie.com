import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import toast from "react-hot-toast";
import { useState } from "react";

import { CommentProps } from "./BlogComments";
import { shimmer } from "@lib/shimmer";

interface CommentComponentProps {
    data: CommentProps;
    refetch: any;
}

const Comment = ({ data, refetch }: CommentComponentProps) => {
    const [session] = useSession();
    const router = useRouter();

    const [deleting, setDeleting] = useState<boolean>(false);

    const deleteEntry = async () => {
        const deletePromise = new Promise<string>(async (resolve, reject) => {
            setDeleting(true);
            const deleteRequest = await fetch(
                `/api/blog/comment/${router.query.slug}`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        id: data.id,
                    }),
                }
            );

            const response = await deleteRequest.json();
            if (deleteRequest.status === 200) {
                resolve("Deleted successfully!");
            } else {
                reject(response);
            }

            await refetch();
            setDeleting(false);
        });

        toast.promise(deletePromise, {
            loading: "Loading",
            success: "Deleted successfully!",
            error: "Error when fetching!",
        });
    };

    return (
        <div className="max-h-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg p-3 flex flex-col justify-center items-start shadow-lg mb-4 hoverItem duration-200">
            <p className="px-2">{data.comment}</p>
            <div className="flex flex-row items-center mr-2 mt-4">
                <Image
                    src={data.image}
                    width="48"
                    height="48"
                    blurDataURL={shimmer(1920, 1080)}
                    placeholder="blur"
                    className="rounded-full w-10 h-10 shadow-lg"
                    alt={`${data.name}'s profile image`}
                />
                <h1 className="ml-4 text-gray-800 dark:text-gray-300">
                    {data.name}{" "}
                    <span className="text-gray-900 dark:text-gray-500">
                        /{" "}
                        {format(new Date(data.date), "d MMM yyyy 'at' hh:mm a")}
                    </span>
                    {session && session.user.email === data.email && (
                        <span className="text-gray-900 dark:text-gray-500">
                            {" "}
                            /{" "}
                            <span
                                className="text-red-500 dark:text-red-400 cursor-pointer hover:underline"
                                onClick={deleteEntry}
                            >
                                {deleting ? "Deleting" : "Delete"}
                            </span>
                        </span>
                    )}
                </h1>
            </div>
        </div>
    );
};

export default Comment;
