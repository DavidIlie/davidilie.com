import Comment from "./Comment";

export const BlogComments = ({ comments, refetch }) => {
    return (
        <div className="mb-5 mt-5">
            <h1 className="mt-2 text-3xl font-semibold header-gradient mb-4">
                Comments
            </h1>
            {comments?.map((comment, index) => (
                <Comment refetch={refetch} key={index} data={comment} />
            ))}
            {comments?.length === 0 && (
                <div className="-mt-5">
                    <h1 className="text-center text-3xl">No Comments</h1>
                    <p className="text-center">Be the first to do so!</p>
                </div>
            )}
        </div>
    );
};
