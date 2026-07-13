import { createContext } from "react";

import type { UserContextType } from "../../typescript/interface/context.api.interfaces";



const CreateUserContext = createContext<UserContextType | null>(null);

export default CreateUserContext;