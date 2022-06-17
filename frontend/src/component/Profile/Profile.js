import { padding } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { MdSignalCellularNull } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, clearMsg, update } from '../../actions/userAction'
import Loader from '../loader/loader'
import './profile.css'

function Profile() {
    const dispatch = useDispatch()
    const alert = useAlert();
    const navigate = useNavigate()


    const { user,loading,error,msg } = useSelector((state) => state.user)
    const [editState, setEditState] = useState(true)
    const [editBtnDisplay, setEditBtnDisplay] = useState('block')
    const [updateBtnDisplay, setUpdateBtnDisplay] = useState('none')
    const [isborder, setIsborder] = useState('none')
    const [isPadding, setIsPadding] = useState('0')

    const [updatedUser,setUpdatedUser]=useState(user)

    function editHandle() {
        setEditState(false)
        setUpdateBtnDisplay('block')
        setEditBtnDisplay('none')
        setIsborder('1px solid black')
        setIsPadding('0 0.5rem')
    }
    function updateHandle() {
        setEditBtnDisplay('block')
        setUpdateBtnDisplay('none')
        setIsborder('none')
        setIsPadding('0')
    }
    function changePassHandle(){
        navigate('/password/change')
    }

    const { name, email,password} = updatedUser;


    const [avatar, setAvatar] = useState("");

    const updateDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
        }
    };

    const updateSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(update(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (msg) {
            alert.success(msg);
            dispatch(clearMsg());
        }
    }, [dispatch, error,msg, alert]);
    return (
        <>
            {loading ? <Loader/> : <div className='profileCon'>
                <form className="profileBox" onSubmit={updateSubmit}>
                    <div className="profileBoxLeft">
                        <div className="profilePicture">{user.avatar.url != "none" ? <><img src={user.avatar.url} alt="profile picture" /></> : <>hi</>}</div>
                        <label style={{ display: updateBtnDisplay }} className='profilePagebtn' for="inputProfilePictue">
                            Select Image
                            <input name='avatar' id="inputProfilePictue" type="file" accept="image/*" onChange={updateDataChange}/>
                        </label>
                    </div>
                    <div className="profileBoxRight">
                        <div>
                            <div>Full Name</div>
                            <input type="text" name='name' defaultValue={user.name} disabled={editState} style={{ border: isborder, padding: isPadding }} onChange={updateDataChange}/>
                        </div>
                        <div>
                            <div>Email</div>
                            <input type="text" name='email' defaultValue={user.email} disabled={editState} style={{ border: isborder, padding: isPadding }} onChange={updateDataChange}/>
                        </div>
                        <div style={{ display: updateBtnDisplay }}>
                            <div>Password</div>
                            <input type="password" name='password' disabled={editState} style={{ border: isborder, padding: isPadding }} onChange={updateDataChange}/>
                        </div>
                        <div>
                            <div>Joined On</div>
                            <input type="text" value={user.createdAt.slice(0, 10)} disabled style={{ border: 'none' }} />
                        </div>
                        <div className='profileButtons'>
                            <button className='profilePagebtn' type='button' style={{ display: editBtnDisplay }} onClick={() => { editHandle() }}>Edit Profile</button>
                            <button className='profilePagebtn' type='submit' style={{ display: updateBtnDisplay }} onClick={() => { updateHandle() }}>Update Profile</button>
                            <button className='profilePagebtn' type='button' onClick={()=>{changePassHandle()}}>Change Password</button>
                        </div>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default Profile