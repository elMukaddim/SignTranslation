import { orderClearHistory } from "../../api/order"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave} from "../../utils/storage"
import STORAGE_KEY_USER from "../const/storageKeys"

const ProfileActions = () => {
 
    const { user, setUser } = useUser()

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure?')) {
            // Send an event to the parent.
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }
    const handleClearHistoryClick = async () => {
        if (!window.confirm('Are you sure?\n This can not be undone!')) {
            return
        }
        const [clearError] = await orderClearHistory(user.id)


        if (clearError !== null) {

            return
        }
            
        const updatedUser = {
            ...user,
            orders: []
        }
        storageSave(STORAGE_KEY_USER,updatedUser)
        setUser(updatedUser) 
    }
    
    return (
        <ul>
            <li><button onClick={handleClearHistoryClick}>clear history</button></li>
            <li><button onClick={handleLogoutClick}>log out</button></li>
        </ul>
    )
}

export default ProfileActions 