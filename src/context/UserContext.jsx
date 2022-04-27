import { createContext, useContext, useState } from "react"
import STORAGE_KEY_USER from "../components/const/storageKeys"
import { storageRead} from '../utils/storage'
// Context object -> exposing
const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext) // Return {user,setUser}
}

// Provider -> managing state
const UserProvider = ({ children }) => {

    const [user, setUser] = useState(storageRead(STORAGE_KEY_USER)) 

    const state = {
        user,
        setUser
    }


    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider