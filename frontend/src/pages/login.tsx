import { GetServerSideProps } from "next";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
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
        <div className="flex items-center justify-center h-screen px-4 py-12 sm:px-6 lg:px-8">
            {stateLoggedIn === false ? (
                <div className="w-full max-w-md space-y-8">
                    <h2 className="mt-6 -mb-5 text-3xl font-extrabold text-center header-gradient">
                        API Log In
                    </h2>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={FormValidationSchema}
                        onSubmit={async (data, { resetForm }) => {
                            const loginPromise = new Promise<string>(
                                async (resolve, reject) => {
                                    setPendingLogin(true);

                                    const loginRequest = await fetch(
                                        `${identityURL}/login`,

                                        {
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            method: "POST",
                                            body: JSON.stringify(data),
                                        }
                                    );

                                    const body = await loginRequest.json();

                                    if (loginRequest.status === 200) {
                                        setPendingLogin(false);
                                        setStateLoggedIn(true);
                                        resolve(body.email);
                                    } else {
                                        setPendingLogin(false);
                                        setStateLoggedIn(false);
                                        reject(body.message);
                                    }
                                }
                            );
                            toast.promise(loginPromise, {
                                loading: "Loading",
                                success: "Logged successfully!",
                                error: "Authortization error!",
                            });
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className="mb-3 -space-y-px rounded-md shadow-sm">
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
                                <h1 className="mb-1 -mt-1 font-semibold text-center text-red-500">
                                    {errors.password || errors.email}
                                </h1>
                                <button
                                    type="submit"
                                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white duration-200 bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        {pendingLogin ? (
                                            <svg
                                                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
                                                className="w-5 h-5 text-indigo-500 duration-200 group-hover:text-indigo-400"
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
                    <h1 className="text-3xl text-white">
                        Logged in as{" "}
                        <span className="font-semibold header-gradient">
                            {stateLoggedIn}
                        </span>
                    </h1>
                </Redirect>
            ) : (
                <h1 className="text-3xl text-white">
                    Logged in as{" "}
                    <span className="font-semibold header-gradient">
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
            className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 text-gray-900 ${
                placeholder === "Email" ? "rounded-t-md" : "rounded-b-md"
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        />
    );
};
