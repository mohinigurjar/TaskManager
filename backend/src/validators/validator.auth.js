const z = require("zod");

const passwordValidator = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,20}$/,
        "Password must contain at least one uppercase letter, one number and one special character"
    );

exports.signupValidator = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name cannot exceed 20 characters"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: passwordValidator
}).strict();


exports.loginValidator = z.object({

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
}).strict();