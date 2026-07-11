import React, { createContext } from "react";
import type { StudentListType } from "../../typescript/interface/interface"

export interface UserContextType {
    studentList: StudentListType[],
    isLoading: boolean,
    isError : string | null,
    searchResult:StudentListType[],
    isEdit: boolean;
    setisEdit: React.Dispatch<React.SetStateAction<boolean>>,
    editMode: StudentListType[],
    seteditMode: React.Dispatch<React.SetStateAction<StudentListType[]>>
    searchFunc: (data:{searchData:string}|undefined) => void,
    handleDelete: (data:string|undefined) => void,
    updateUser: (data:StudentListType) => void,
    hambuerger: boolean,
    sethambuerger: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateUserContext = createContext<UserContextType | null>(null);

export default CreateUserContext;