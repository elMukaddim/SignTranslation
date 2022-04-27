import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {loginUser} from '../../api/user'
import { storageSave } from '../../utils/storage.js';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import STORAGE_KEY_USER from '../const/storageKeys';
import './login.css' 


const usernameConfig = {
    required: true, 
    minLength: 3
}
const LoginForm = () => {

    // Hooks
    const {register,handleSubmit, formState: { errors } } = useForm()
        const {user, setUser} = useUser();
    
        // LOCAL state
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)
    const navigate = useNavigate()

    //Side Effects
        useEffect(() => {
            if (user !== null) {
                navigate('profile')
            }
        }, [user, navigate ]) // Empty deps - Only run 1ce
    //Event Handlers

    const onSubmit = async ({username}) => {
        setLoading(true);
        const [error, userResponse] = await loginUser(username)
        if (error !==null) {
            setApiError(error)
        }
        if(userResponse !== null) {
            storageSave(STORAGE_KEY_USER, userResponse) // VERANDER
            setUser(userResponse)
        }
        setLoading(false);

    }

    const errorMessage = (() => {
        if (!errors.username) {
            return null
        }

        if (errors.username.type === 'required') {
            return <span>username is required</span>
            
        }
        if (errors.username.type === 'minLength') {
           return <span>username is too short (Min 3 characters))</span>
        }
    })()

    return (
        <>
            <h2>Gimme your username</h2>

        <div className='login'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className='fieldset'>
                    <label htmlFor="username"> Username</label>
                    <input
                        type="text"
                        placeholder='johndoe'
                        {...register("username", usernameConfig)}
                    />
                    {/* {(errors.username && errors.username.type === 'required') && <span>username is required</span>}
                    {(errors.username && errors.username.type === 'minLength') && <span>username is too short (Min 3 characters))</span>} */}
                    {errorMessage}
                </fieldset>
                <button type="submit" className='button' disabled={loading}>Continue</button>
                {loading && <p>Logging in...</p>}
                {apiError && <p> { apiError }</p>}
                 
            </form>
            </div>
        </>
    )
}
export default LoginForm