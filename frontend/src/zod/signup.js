import * as zod from "zod";

// schema for frontend signup form
const signupObject = zod.object({
    firstname: zod.string().max(50),
    lastname: zod.string().max(50),
    email: zod.string().email(),
    username: zod.string().min(2).max(50),
    password: zod.string().min(6),
});

signupObject.required();

export default signupObject;