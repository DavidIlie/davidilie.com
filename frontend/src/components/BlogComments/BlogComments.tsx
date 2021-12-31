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
        <div className="mt-5 mb-5">
            <h1 className="mt-2 mb-4 text-3xl font-semibold header-gradient">
                Comments
            </h1>
            {comments?.reverse().map((comment: CommentProps, index: number) => (
                <Comment refetch={refetch} key={index} data={comment} />
            ))}
            {comments?.length === 0 && (
                <div className="-mt-5">
                    <h1 className="text-3xl text-center">No Comments</h1>
                </div>
            )}
        </div>
    );
};
