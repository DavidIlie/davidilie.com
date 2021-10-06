import { Field, Form, Formik } from "formik";

import { BsFillPersonFill } from "react-icons/bs";

import CustomField from "@ui/form/CustomField";
import CustomLabel from "@ui/form/CustomLabel";

const ContactFormModule = (): JSX.Element => {
    return (
        <div className="mx-auto max-w-xl rounded-xl p-5 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    title: "",
                    description: "",
                }}
                onSubmit={(data, { resetForm, setSubmitting }) => {
                    console.log(data);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <CustomLabel name="Name" error={errors.name} />
                        <Field
                            name="name"
                            as={CustomField}
                            icon={BsFillPersonFill}
                        />
                        <div className="mb-2" />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactFormModule;
