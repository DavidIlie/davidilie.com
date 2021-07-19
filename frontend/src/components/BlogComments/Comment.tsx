import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { toast } from "react-toastify";
import { useState } from "react";

import { CommentProps } from "./BlogComments";

interface CommentComponentProps {
    data: CommentProps;
    refetch: any;
}

const Comment = ({ data, refetch }: CommentComponentProps) => {
    const [session, loading] = useSession();
    const router = useRouter();

    const [deleting, setDeleting] = useState(false);

    const deleteEntry = async () => {
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
            toast.success("Deleted successfully!");
        } else {
            toast.error(response);
        }

        await refetch();
        setDeleting(false);
    };

    return (
        <div className="max-h-32 h-32 bg-gray-800 rounded-lg p-3 flex flex-col justify-center items-start shadow-lg mb-4 hoverItem duration-200">
            <p className="px-2">{data.comment}</p>
            <div className="flex flex-row items-center mr-2 mt-4">
                <Image
                    src={data.image}
                    width="48"
                    height="48"
                    blurDataURL={
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                    }
                    placeholder="blur"
                    className="rounded-full w-10 h-10 shadow-lg"
                />
                <h1 className="ml-4 text-gray-300">
                    {data.name}{" "}
                    <span className="text-gray-500">
                        /{" "}
                        {format(new Date(data.date), "d MMM yyyy 'at' h:mm bb")}
                    </span>
                    {session && session.user.email === data.email && (
                        <span className="text-gray-500">
                            {" "}
                            /{" "}
                            <span
                                className="text-red-400 cursor-pointer hover:underline"
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
