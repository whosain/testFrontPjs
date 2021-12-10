import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { listUsers, listRoles, listLocations, getUserDetails } from "./actions/userActions";
import { USER_CREATE_RESET, USER_UPDATE_RESET , USER_DETAILS_RESET} from './constants/userConstants'
import ModalCustome from './components/ModalCustome';
import Loader from './components/Loader';
import Message from './components/Message';

const App = () => {

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false)

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const roleList = useSelector(state => state.roleList)
  const { loading: roleLoading, error: roleError, roles } = roleList

  const locationList = useSelector(state => state.locationList)
  const { loading: locationLoading, error: locationError, locations } = locationList

  const userCreate = useSelector(state => state.userCreate)
  const { success, loading: userLoading, error: userError } = userCreate

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: userDetailLoading,
    error: userDetailError,
    user,
  } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = userUpdate



  const createUserHandler = () => {
    setEdit(false)
    setShow(true)
  }

  const deleteHandler = (id) => {
    console.log(id, 'delete user');
  }

  const handleClose = () => setShow(false);

  const editHandler = (id) => {
    // console.log(id, 'edit user');
    dispatch(getUserDetails(id));
    setEdit(true)
    setShow(true)
  }


  useEffect(() => {

    if (success) {
      dispatch({ type: USER_CREATE_RESET })
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch({ type: USER_DETAILS_RESET })
    }


    dispatch(listUsers())
    dispatch(listRoles())
    dispatch(listLocations())

  }, [dispatch, success, successUpdate])


  return (
    <Container className='py-3'>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className='text-right'>
          <Button
            className='my-3'
            onClick={createUserHandler}
          >
            <i className='fas fa-plus'></i> Create User
          </Button>
        </Col>
      </Row>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {userLoading && <Loader />}
      {userError && <Message variant='danger'>{userError}</Message>}

      <Table
        striped
        bordered
        hover
        responsive
        className='tabel-sm'
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>USERNAME</th>
            <th>FULLNAME</th>
            <th>INITIAL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.usrID}>
              <td>{user.usrID}</td>
              <td>{user.usrName}</td>
              <td>{user.usrFullName}</td>
              <td>
                {user.usrInitial}
              </td>
              <td>
                {user.usrRole === 1 ? (
                  <i
                    className='fas fa-check'
                    style={{ color: 'green' }}
                  ></i>
                ) : (
                  <i
                    className='fas fa-times'
                    style={{ color: 'red' }}
                  ></i>
                )}
              </td>
              <td>
                <Button
                  variant='light'
                  className='btn-sm'
                  onClick={() => editHandler(user.usrID)}
                >
                  <i className='fas fa-edit'></i>
                </Button>

                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(user.usrID)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
      <ModalCustome
        show={show}
        handleClose={handleClose}
        roleOption={roles}
        locationOption={locations}
        data={user}
        isEdit={edit}
      />
    </Container>
  )
}

export default App
