import { createContext } from "react";
import type { CourseContextType } from "../../typescript/interface/context.api.interfaces";

 
const CourseContextCreate = createContext<CourseContextType | null>(null);
export default CourseContextCreate;