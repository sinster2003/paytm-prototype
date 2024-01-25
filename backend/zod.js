// input validate

const zod = require("zod");

const signupValidation = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email({ message: "Invalid email" }),
    username: zod.string().min(2, { message: "Username too short" }).max(20, { message: "Username too long" }),
    password: zod.string().min(6, { message: "Password too short" })
});

signupValidation.required(); // mandatory to fill

const signinValidation = zod.object({
    username: zod.string().min(2, { message: "Username too short" }).max(20, { message: "Username too long" }),
    password: zod.string().min(6, { message: "Password too short" })
});

signinValidation.required();

const updateValidation = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    email: zod.string().email().optional(),
    username: zod.string().min(2, { message: "Username too short" }).max(20, { message: "Username too long" }).optional(),
    password: zod.string().min(6, { message: "Password too short" }).optional()
});

module.exports = {
    signupValidation,
    signinValidation,
    updateValidation
}
