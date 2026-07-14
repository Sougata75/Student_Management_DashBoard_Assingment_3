export interface BarItems {
    path: string,
    label: string
}


export interface SignupPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string,
    isBlocked?: boolean,
}

export interface LoginPyaload {
  email: string;
  password: string;
}

export interface StudentListType {
  $id: string
  name: string,
  email: string,
  phone: string,
  password: string,
  role: string,
  isBlocked: boolean,
  auth_user_id: string,
  enrolled_courses?: string[];
  $createdAt: string,
}

export interface CoursePayload {
  course_name: string;
  course_description: string;
  course_code?: string;
}

export interface CourseSubject {
  id: string;
  name: string;
  overview: string;
}

export interface CourseInterface {
  $id: string;
  course_name:string;
  course_description:string;
  course_code:string;
  enrolled_students: string[] | any[];
  course_subjects:CourseSubject[];
  $createdAt:string;
  $updatedAt:string;
}

export interface SubjectPayload {
  semister: string;
  subject: string;
  overview: string;
}