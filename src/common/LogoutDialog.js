import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { userExists } from '../services/SessionUtils';



function LogoutDialog(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = () => {
        localStorage.removeItem('username');
        handleClose();
        props.setLoggedIn(false);
    }

    return (
      <>
        <a onClick={handleShow} href='#'>خروج<i className="flaticon-log-out"></i></a>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>آیا می‌خواهید از حساب کاربری خود خارج شوید؟</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleClose}>
              انصراف
            </Button>
            <Button variant="success" onClick={logout}>
              خروج
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default LogoutDialog;