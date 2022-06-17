import React, { useEffect, useState } from 'react'
import './changePassword.css'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, clearMsg, resetPass } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { IoLockOpenOutline } from 'react-icons/io5'
import { IoLockClosed } from 'react-icons/io5'

function ResetPassword() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { isAuthenticated, error, msg } = useSelector((state) => state.user)

    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const resetPassSubmit = () => {
        if (params.resetToken) {
            dispatch(resetPass(params.resetToken, password, confirmpassword))
        }
        else {
            alert.error('Reset url not valid')
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        else if (msg) {
            alert.success(msg)
            dispatch(clearMsg())
        }

    }, [isAuthenticated, error, msg])

    return (
        <>
            <div className='changePassCon'>
                <form className='changePassForm' onSubmit={resetPassSubmit}>
                    <div className='changePassFormHeader'><span>Reset Password</span></div>
                    <div>
                        <lebel for='newPassInput'><IoLockOpenOutline/></lebel>
                        <input id='newPassInput' type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div>
                        <lebel for='conNewPassInput'><IoLockClosed/></lebel>
                        <input id='conNewPassInput' type="password" placeholder='Confirm password' onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </div>
                    <button type='submit'>Proceed</button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword