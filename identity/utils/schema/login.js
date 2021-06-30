const yup = require("yup");

module.exports = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});
