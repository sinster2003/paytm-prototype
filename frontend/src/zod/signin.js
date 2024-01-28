import * as zod from "zod";

// schema for frontend signup form
const signinObject = zod.object({
    username: zod.string().min(2).max(50),
    password: zod.string().min(6),
});

signinObject.required();

export default signinObject;