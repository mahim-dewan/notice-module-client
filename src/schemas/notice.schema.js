import z from "zod";

export const noticeSchema = z
  .object({
    target_department: z
      .array(z.string())
      .min(1, "Please select at least one department"),

    title: z.string().min(1, "Title is required"),

    employee_id: z.string().optional(),
    employee_name: z.string().optional(),
    employee_position: z.string().optional(),

    type: z.string().min(1, "Notice type is required"),

    publish_date: z.coerce.date({ required_error: "Publish date is required" }),

    body: z.string().optional(),

    attaches: z.array().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.target_department.includes("Individual")) {
      if (!data?.employee_id) {
        ctx.addIssue({
          path: ["employee_id"],
          message: "Employee ID is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data?.employee_name) {
        ctx.addIssue({
          path: ["employee_name"],
          message: "Employee name is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data?.employee_position) {
        ctx.addIssue({
          path: ["employee_position"],
          message: "Employee position is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
