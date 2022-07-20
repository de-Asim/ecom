import React, { useEffect } from 'react'
import './allUser.css'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../../loader/loader';
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, clearMsg, deleteUser, getAllUser, updateUserRole } from '../../../actions/adminAction';
import { MenuItem, TextField } from '@mui/material';

function AllUser() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, msg, allUser } = useSelector((state) => state.admin)

    // table headers
    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 1 },
        { field: 'userName', headerName: 'User name', minWidth: 100, flex: 1 },
        { field: 'userEmail', headerName: 'Email', minWidth: 80, flex: 1 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 80,
            flex: .5,
            renderCell: (params) => {
                return (<>
                    {edit && editId === params.getValue(params.id, "id")
                        ? <> <TextField
                            select
                            label=""
                            value={params.row.role}
                            onChange={editRoleHandler}
                            className='editRoleInput'
                        >
                                <MenuItem key={'user'} value={'user'}>
                                    {'user'}
                                </MenuItem>
                                <MenuItem key={'admin'} value={'admin'}>
                                    {'admin'}
                                </MenuItem>
                        </TextField> </>
                        : <>{params.row.role}</>}
                </>
                )
            }
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            minWidth: 80,
            flex: .5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 80,
            type: 'number',
            flex: .5,
            renderCell: (params) => {
                return (
                    <><div className='actionCon'>

                        <button className='editBtn' onClick={() => { editUserOpen(params.getValue(params.id, "id")) }}>
                            < FiEdit />
                        </button>

                        <button
                            onClick={() =>
                                handleClickOpen(params.getValue(params.id, "id"))
                            }
                        >
                            <MdDelete />
                        </button>
                    </div>
                    </>
                );
            },
        },
    ];

    let rows = []
    // pushing user data to rows
    if (allUser && allUser.length > 0) {
        allUser.map((e) => {
            rows.push({ id: e._id, userName: e.name, userEmail: e.email, role: e.role, ordered: e.ordered, createdAt: e.createdAt.slice(0, 10) })
        })
    }
    // edit user
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState('')
    const editUserOpen = (id) => {
        setEdit(true)
        setEditId(id,)
    }
    const editUserClose = () => {
        setEdit(false)
        setEditId('')
    }

    const editRoleHandler=(e)=>{
        dispatch(updateUserRole(editId,e.target.value))
        editUserClose()
    }

    // delete user
    const [deleteId, setDeleteId] = useState('')

    const deleteUserHandler = () => {
        handleClose()
        dispatch(deleteUser(deleteId))
    }

    // modal handle
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        setDeleteId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        else if (msg) {
            alert.success(msg)
            dispatch(clearMsg())
        }
        else{
            dispatch(getAllUser())
        }
    }, [dispatch, msg, error])


    return (
        <>{loading ? <Loader /> :
            <div className='allProductsParent'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    autoHeight
                    disableColumnMenu
                />
                <div>
                    {/* modal to delete */}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm delete ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button sx={{ color: "#08CC8E" }} onClick={handleClose}>Cancel</Button>
                            <Button sx={{ color: 'orangered' }} onClick={deleteUserHandler} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>}
        </>
    )
}

export default AllUser