import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Col, FloatingLabel } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createUser,updateUser } from "../actions/userActions";

const ModalCustome = ({
  show,
  handleClose,
  roleOption,
  locationOption,
  data,
  isEdit
}) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState([]);
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        updateUser({
          usrName: username,
          usrFullName: fullname,
          usrPswd: password,
          passwordConfirmation: confirmPassword,
          usrRole: role,
          locationsIDS: location,
        }, data.usrID)
      );
    } else {
      dispatch(
        createUser({
          usrName: username,
          usrFullName: fullname,
          usrPswd: password,
          passwordConfirmation: confirmPassword,
          usrRole: role,
          locationsIDS: location,
        })
      );
    }

    // console.log("submit here");
  };

  useEffect(() => {
    if (data) {
      setUsername(data.usrName);
      setFullname(data.usrFullName);
      setPassword(data.usrPswd);
      setConfirmPassword(data.passwordConfirmation);
      setRole(data.usrRole);
      setLocation(data.locationsIDS);
    }
  }, [data]);

  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Modal.Header closeButton>
              <Modal.Title>{isEdit?'Edit':'Add'} User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="fullname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>{" "}
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roleOption &&
                    roleOption.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.role}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Locations</Form.Label>{" "}
                <Form.Control
                  as="select"
                  multiple
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      [].slice
                        .call(e.target.selectedOptions)
                        .map((item) => item.value)
                    )
                  }
                >
                  {locationOption &&
                    locationOption.map((item) => (
                      <option value={item.locID} key={item.locID}>
                        {item.locName}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </FormContainer>
      </Modal>
    </div>
  );
};

export default ModalCustome;
