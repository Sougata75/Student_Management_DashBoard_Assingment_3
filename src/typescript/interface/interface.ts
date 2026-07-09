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
  enrolled_courses: string[];
  $createdAt: string,
}