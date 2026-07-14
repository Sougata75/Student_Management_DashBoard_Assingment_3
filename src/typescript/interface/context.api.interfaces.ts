import type { CourseInterface, StudentListType } from "./interface";

export interface UserContextType {
    studentList: StudentListType[];
    isLoading: boolean;
    isError : string | null;
    searchResult:StudentListType[];
    isEdit: boolean;
    setisEdit: React.Dispatch<React.SetStateAction<boolean>>;
    editMode: StudentListType[];
    seteditMode: React.Dispatch<React.SetStateAction<StudentListType[]>>;
    searchFunc: (data:{searchData:string}|undefined) => void;
    handleDelete: (data:string|undefined) => void;
    updateUser: (data:StudentListType) => void;
    hambuerger: boolean;
    sethambuerger: React.Dispatch<React.SetStateAction<boolean>>;
    individualPerson:StudentListType | null;
    userData: () => void;
}

export interface CourseContextType{
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isError: string | null;
    setisError: React.Dispatch<React.SetStateAction<string>>;
    addCourse: boolean;
    setaddCourse: React.Dispatch<React.SetStateAction<boolean>>;
    fetchCourses: () => void;
    
    courses: CourseInterface[];
    setcourses: React.Dispatch<React.SetStateAction<CourseInterface[]>>;
    loadingState:boolean;
    isEdit:CourseInterface[]; 
    setisEdit:React.Dispatch<React.SetStateAction<CourseInterface[]>>;
    editDialog:boolean; 
    seteditDialog:React.Dispatch<React.SetStateAction<boolean>>;
    isSubject:boolean;
    setisSubject:React.Dispatch<React.SetStateAction<boolean>>;
    
}