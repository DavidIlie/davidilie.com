import * as yup from "yup";
export default yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});
//# sourceMappingURL=login.js.map