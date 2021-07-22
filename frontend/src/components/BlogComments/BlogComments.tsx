import Comment from "./Comment";

interface BlogCommentsProps {
    comments: any;
    refetch: any;
}

export interface CommentProps {
    comment: string;
    date: Date;
    email: string;
    id: string;
    image: string;
    name: string;
}

export const BlogComments = ({
    comments,
    refetch,
}: BlogCommentsProps): JSX.Element => {
    return (
        <div className="mb-5 mt-5">
            <h1 className="mt-2 text-3xl font-semibold header-gradient mb-4">
                Comments
            </h1>
            {comments?.map((comment: CommentProps, index: number) => (
                <Comment refetch={refetch} key={index} data={comment} />
            ))}
            {comments?.length === 0 && (
                <div className="-mt-5">
                    <h1 className="text-center text-3xl">No Comments</h1>
                </div>
            )}
        </div>
    );
};
