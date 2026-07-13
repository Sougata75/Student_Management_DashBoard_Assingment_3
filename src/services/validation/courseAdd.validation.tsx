import * as yup from "yup";

export const courseSchema = yup.object({
  course_name: yup.string().required("Course name is required"),
  course_description: yup.string().required("Course description is required"),
})

export const subjectSchema = yup.object({
  semister: yup.string().required("Semister requierd"),
  subject: yup.string().required("Subject name is required"),
  overview: yup.string().required("Please provide an overview")
})