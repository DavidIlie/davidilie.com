import { signOut, useSession } from "next-auth/client";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

import LoginModal from "@components/LoginModal";
import CustomField from "@ui/form/CustomField";
import CustomSubmitButton from "@ui/form/CustomSubmitButton";
import CustomLabel from "@ui/form/CustomLabel";

export const BlogInteractions = ({ slug, refetch }) => {
    const [session, loading] = useSession();

    const [modalOpen, setModalOpen] = useState(false);

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
            {!session && (
                <div>
                    <div className="border rounded p-6 my-4 w-full border-gray-800 bg-blue-opaque">
                        <h5 className="text-lg md:text-xl font-bold text-gray-100">
                            Sign in to comment
                        </h5>
                        <p className="my-1 text-gray-200">
                            Share your opinion regarding this post for the world
                            to see
                        </p>
                        <a
                            className="flex items-center justify-center my-4 font-bold h-8 bg-gray-700 hover:bg-gray-800 duration-200 cursor-pointer text-gray-100 rounded w-28"
                            onClick={() => setModalOpen(true)}
                        >
                            Login
                        </a>
                        <p className="text-sm text-gray-200">
                            Your information is only used to display your name
                            and reply by email.
                        </p>
                    </div>
                </div>
            )}
            {session && (
                <div className="border rounded p-6 my-4 w-full border-gray-800 bg-blue-opaque">
                    <h1 className="mb-1">
                        You are signed in as {session.user.email}. Not You?{" "}
                        <a
                            onClick={signOut}
                            className="duration-200 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
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
                            resetForm();

                            const CommentRequest = await fetch(
                                `/api/blog/comment/${slug}`,
                                {
                                    method: "POST",
                                    body: JSON.stringify({
                                        comment: data.comment,
                                    }),
                                }
                            );
                            const response = await CommentRequest.json();
                            if (CommentRequest.status === 200) {
                                toast.success(response.message);
                            } else {
                                toast.error(response.message);
                            }
                            refetch();
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
                                <CustomSubmitButton text="Submit Comment" />
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
            {modalOpen ? (
                <LoginModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    callback="/blog/welcome-to-my-blog-and-how-it-works#interactions"
                />
            ) : null}
        </div>
    );
};
