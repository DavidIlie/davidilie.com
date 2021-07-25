import { GetServerSideProps } from "next";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import redirect from "nextjs-redirect";

const Login = ({ loggedIn, identityURL }): JSX.Element => {
    const router = useRouter();
    const { fallback }: any = router.query;

    const Redirect = redirect(fallback);

    const [pendingLogin, setPendingLogin] = useState(false);
    const [stateLoggedIn, setStateLoggedIn] = useState(loggedIn);

    const FormValidationSchema = yup.object({
        email: yup
            .string()
            .email("This is not a valid email")
            .required("Username is required!"),
        password: yup
            .string()
            .min(8, "Cannot be less than 8 characters!")
            .required("Password is required!"),
    });

    return (
        <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {stateLoggedIn === false ? (
                <div className="max-w-md w-full space-y-8">
                    <h2 className="mt-6 -mb-5 text-center text-3xl font-extrabold header-gradient">
                        API Log In
                    </h2>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={FormValidationSchema}
                        onSubmit={async (data, { resetForm }) => {
                            setPendingLogin(true);

                            const loginRequest = await fetch(
                                `${identityURL}/login`,

                                {
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                    body: JSON.stringify(data),
                                }
                            );

                            const body = await loginRequest.json();

                            if (loginRequest.status === 200) {
                                setPendingLogin(false);
                                setStateLoggedIn(body.email);
                            } else {
                                toast.error(body.message, {
                                    toastId: body.message,
                                });
                                setPendingLogin(false);
                            }
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className="rounded-md shadow-sm -space-y-px mb-3">
                                    <Field
                                        name="email"
                                        placeholder="Email"
                                        as={Input}
                                    />
                                    <Field
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        as={Input}
                                    />
                                </div>
                                <h1 className="text-red-500 font-semibold text-center mb-1 -mt-1">
                                    {errors.password || errors.email}
                                </h1>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        {pendingLogin ? (
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 duration-200"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    Sign in
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : fallback !== undefined ? (
                <Redirect>
                    <h1 className="text-white text-3xl">
                        Logged in as{" "}
                        <span className="header-gradient font-semibold">
                            {stateLoggedIn}
                        </span>
                    </h1>
                </Redirect>
            ) : (
                <h1 className="text-white text-3xl">
                    Logged in as{" "}
                    <span className="header-gradient font-semibold">
                        {stateLoggedIn}
                    </span>
                </h1>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req } = ctx;
    const { access } = req.cookies;

    const validateRequest = await fetch(
        `${process.env.IDENTITY_SERVER_URL}/user`,
        {
            method: "GET",
            headers: {
                cookie: `access=${access}`,
            },
        }
    );

    if (validateRequest.status === 200) {
        const body = await validateRequest.json();
        const email = body.email;
        return {
            props: {
                loggedIn: email,
                identityURL: process.env.IDENTITY_SERVER_URL,
            },
        };
    } else {
        return {
            props: {
                loggedIn: false,
                identityURL: process.env.IDENTITY_SERVER_URL,
            },
        };
    }
};

export default Login;

interface InputProps {
    name: string;
    onBlur: any;
    onChange: any;
    placeholder: string;
    value: string;
    type: string;
}

const Input = ({
    name,
    onBlur,
    onChange,
    placeholder,
    value,
    type,
}: Partial<InputProps>): JSX.Element => {
    return (
        <input
            name={name}
            onBlur={onBlur}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                placeholder === "Email" ? "rounded-t-md" : "rounded-b-md"
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        />
    );
};
