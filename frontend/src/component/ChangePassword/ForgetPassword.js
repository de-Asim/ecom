import React, { useEffect } from 'react'
import './changePassword.css'
import { IoMail } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { clearErrors, clearMsg, forgotPass } from '../../actions/userAction'
import { useAlert } from 'react-alert'



function ForgetPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    const [email, setEmail] = useState('')

    const { isAuthenticated, error, msg } = useSelector((state) => state.user)
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile')
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        else if (msg) {
            alert.success('Recovery mail sent')
            dispatch(clearMsg())
        }

    }, [isAuthenticated, error, msg])

    const forgetPassSubmit = () => {
        dispatch(forgotPass(email))
    }


    return (
        <>
            <div className='changePassCon'>
                <form className='changePassForm' onSubmit={forgetPassSubmit}>
                    <div className='changePassFormHeader'><span>Forgot Password</span></div>
                    <div>
                        <lebel for='conNewPassInput'><IoMail /></lebel>
                        <input id='conNewPassInput' type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <button type='submit'>Proceed</button>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword