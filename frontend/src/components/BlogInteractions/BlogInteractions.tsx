import { signOut, useSession } from "next-auth/react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { FaCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import LoginModal from "@components/LoginModal";
import CustomField from "@ui/form/CustomField";
import CustomSubmitButton from "@ui/form/CustomSubmitButton";
import CustomLabel from "@ui/form/CustomLabel";

interface BlogInteractionsProps {
    slug: string;
    refetch: any;
}

export const BlogInteractions = ({
    slug,
    refetch,
}: BlogInteractionsProps): JSX.Element => {
    const { data: session } = useSession();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [submitting, setSubmitting] = useState<boolean>(false);

    const FormValidationSchema = yup.object({
        comment: yup
            .string()
            .max(96, "Comment cannot be above 96 characters!")
            .min(8, "Comment cannmot be below 8 characters!")
            .required("This is required!"),
    });

    return (
        <div className="border-t-2" id="interactions">
            <h1 className="mt-2 text-3xl font-semibold header-gradient">
                What do you think?
            </h1>
            <div className="flex justify-center">
                <ClipLoader
                    color="#60A5FA"
                    size={75}
                    loading={session === undefined}
                />
            </div>
            {!session && (
                <div>
                    <div className="w-full p-6 my-4 bg-opacity-25 border rounded border-sky-500 dark:border-sky-900 bg-sky-300 dark:bg-sky-900 dark:bg-opacity-25">
                        <h5 className="text-lg font-bold text-gray-800 md:text-xl dark:text-gray-100">
                            Sign in to comment
                        </h5>
                        <p className="my-1 text-gray-900 dark:text-gray-200">
                            Share your opinion regarding this post for the world
                            to see
                        </p>
                        <a
                            className="flex items-center justify-center h-8 my-4 font-bold text-gray-100 duration-200 rounded cursor-pointer bg-slate-700 hover:bg-gray-600 w-28"
                            onClick={() => setModalOpen(true)}
                        >
                            Login
                        </a>
                        <p className="text-sm italic text-gray-900 dark:text-gray-200">
                            Your information is only used to display your name
                            and reply by email.
                        </p>
                    </div>
                </div>
            )}
            {session && (
                <div className="w-full p-6 my-4 bg-opacity-25 border rounded border-sky-500 dark:border-sky-900 bg-sky-300 dark:bg-sky-900 dark:bg-opacity-25">
                    <h1 className="mb-1">
                        You are signed in as {session.user.email}. Not You?{" "}
                        <a
                            onClick={() => signOut()}
                            className="text-blue-600 duration-200 cursor-pointer hover:text-blue-700 hover:underline"
                        >
                            Sign Out
                        </a>
                    </h1>
                    <Formik
                        initialValues={{ comment: "" }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={FormValidationSchema}
                        onSubmit={async (data, { resetForm }) => {
                            const createPromise = new Promise<string>(
                                async (resolve, reject) => {
                                    resetForm();
                                    setSubmitting(true);

                                    const CommentRequest = await fetch(
                                        `/api/blog/comment/${slug}`,
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                comment: data.comment,
                                            }),
                                        }
                                    );
                                    const response =
                                        await CommentRequest.json();
                                    if (CommentRequest.status === 200) {
                                        resolve(response.message);
                                    } else {
                                        reject(response.message);
                                    }
                                    setSubmitting(false);
                                    refetch();
                                }
                            );
                            toast.promise(createPromise, {
                                loading: "Loading",
                                success: "Created successfully!",
                                error: "Error when fetching!",
                            });
                        }}
                    >
                        {(errors) => (
                            <Form>
                                <div className="ml-2">
                                    <CustomLabel
                                        error={errors.errors.comment}
                                        name="Comment"
                                    />
                                </div>
                                <Field
                                    name="comment"
                                    placeholder="Comment"
                                    icon={FaCommentDots}
                                    as={CustomField}
                                />
                                <div className="text-center">
                                    <CustomSubmitButton
                                        text="Submit Comment"
                                        submitting={submitting}
                                        submitText="Submitting"
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
            {modalOpen && (
                <LoginModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    callback={`/blog/${slug}#interactions`}
                />
            )}
        </div>
    );
};
