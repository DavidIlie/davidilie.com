import { Field, Form, Formik } from "formik";
import { BsFillPersonFill, BsCardHeading } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import toast from "react-hot-toast";
import * as yup from "yup";

import CustomField from "@ui/form/CustomField";
import CustomTextArea from "@ui/form/CustomTextArea";
import CustomLabel from "@ui/form/CustomLabel";
import CustomSubmitButton from "@ui/form/CustomSubmitButton";

export const ContactValidationSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Your name must be more than 2 characters!")
        .max(32, "Your name can't be more than 32 characters!")
        .required(),
    email: yup.string().email().required(),
    title: yup
        .string()
        .min(2, "Your title can't be more than 2 characters!")
        .max(32, "Your title can't be more than 32 characters!")
        .required(),
    message: yup.string().required(),
});

const ContactFormModule = (): JSX.Element => {
    return (
        <div className="mx-auto max-w-2xl rounded-xl p-5 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={ContactValidationSchema}
                initialValues={{
                    name: "",
                    email: "",
                    title: "",
                    message: "",
                }}
                onSubmit={async (data, { resetForm, setSubmitting }) => {
                    setSubmitting(true);

                    const r = await fetch("/api/contact", {
                        method: "POST",
                        body: JSON.stringify(data),
                    });
                    const response = await r.json();

                    if (r.status !== 200) {
                        toast.error(response.message);
                    } else {
                        console.log(response);
                        toast.success("Sent successfully!");
                        resetForm();
                    }

                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <CustomLabel name="Name" error={errors.name} />
                        <Field
                            name="name"
                            as={CustomField}
                            icon={BsFillPersonFill}
                            required
                        />
                        <CustomLabel name="Email" error={errors.email} />
                        <Field
                            name="email"
                            type="email"
                            as={CustomField}
                            icon={HiOutlineMail}
                            required
                        />
                        <CustomLabel name="Title" error={errors.title} />
                        <Field
                            name="title"
                            as={CustomField}
                            icon={BsCardHeading}
                            required
                        />
                        <CustomLabel name="Message" error={errors.message} />
                        <Field name="message" as={CustomTextArea} required />
                        <div className="mb-2" />

                        <div className="flex justify-center">
                            <CustomSubmitButton
                                submitting={isSubmitting}
                                text="Submit"
                                submitText="Submitting"
                                width={48}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactFormModule;
