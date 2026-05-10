const z = require("zod");

exports.createTaskValidator = z.object({
    task: z
        .string()
        .min(1, "Task cannot be empty")
        .max(200, "Task too long (max 200 characters)")
        .trim()
});

exports.updateTaskValidator = z.object({
    task: z
        .string()
        .min(1, "Task cannot be empty")
        .max(200, "Task too long")
        .trim()
});


exports.updateTaskStatusValidator = z.object({
    status: z.enum(["pending", "completed"], {
        errorMap: () => ({ message: "Status must be pending or completed" })
    })
});