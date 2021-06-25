import { format } from "date-fns";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { toast } from "react-toastify";

const Comment = ({ data, refetch }) => {
    const [session, loading] = useSession();
    const router = useRouter();

    const deleteEntry = async () => {
        const deleteRequest = await fetch(
            `/api/blog/comment/${router.query.slug}`,
            {
                method: "DELETE",
                body: JSON.stringify({
                    id: data.id,
                }),
            }
        );

        refetch();

        const response = await deleteRequest.json();

        if (deleteRequest.status === 200) {
            toast.success("Deleted successfully!");
        } else {
            toast.error(response);
        }
    };

    return (
        <div className="max-h-32 h-32 bg-gray-800 rounded-lg p-3 flex flex-col justify-center items-start shadow-lg mb-4 hoverItem duration-200">
            <p className="px-2">{data.comment}</p>
            <div className="flex flex-row items-center mr-2 mt-4">
                <img
                    src={data.image}
                    width="48"
                    height="48"
                    className="rounded-full w-10 h-10 mr-4 shadow-lg"
                />
                <h1 className="text-gray-300">
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
                                className="text-red-400 cursor-pointer"
                                onClick={deleteEntry}
                            >
                                Delete
                            </span>
                        </span>
                    )}
                </h1>
            </div>
        </div>
    );
};

export default Comment;
