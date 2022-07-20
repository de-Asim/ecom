import React, { useEffect } from 'react'
import './changePassword.css'
import { IoMdKey } from 'react-icons/io'
import { IoLockOpenOutline } from 'react-icons/io5'
import { IoLockClosed } from 'react-icons/io5'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, clearMsg, updatePass } from '../../actions/userAction'
import Loader from '../loader/loader'
import { useAlert } from 'react-alert'
function ChangePassword() {
    const dispatch = useDispatch();
    const alert = useAlert()

    const{loading,error,msg}=useSelector((state)=>state.user)

    const [passwordData, setPasswordData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const { password, newPassword, confirmNewPassword } = passwordData
    const passwordDataChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    }
    const updatePassSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmNewPassword", confirmNewPassword);
        dispatch(updatePass(myForm));
    }
    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors());
      }
      if(msg){
        alert.success(msg)
        dispatch(clearMsg());
      }
    }, [dispatch,alert,error,msg,loading])
    
    return (
        <>
            {loading ? <Loader/>: <div className='changePassCon'>
                <form className='changePassForm' onSubmit={updatePassSubmit}>
                    <div className='changePassFormHeader'><span>Update Password</span></div>
                    <div>
                        <lebel for='passwordInput'><IoMdKey /></lebel>
                        <input id='passwordInput' name='password' type="password" placeholder='Password' onChange={passwordDataChange} />

                    </div>
                    <div>
                        <lebel for='newPassInput'><IoLockOpenOutline /></lebel>
                        <input id='newPassInput' name='newPassword' type="password" placeholder='New Password' onChange={passwordDataChange} />

                    </div>
                    <div>
                        <lebel for='conNewPassInput'><IoLockClosed /></lebel>
                        <input id='conNewPassInput' name='confirmNewPassword' type="password" placeholder='Confirm Password' onChange={passwordDataChange} />
                    </div>
                    <button type='submit'>Proceed</button>
                </form>
            </div>}
        </>
    )
}

export default ChangePassword