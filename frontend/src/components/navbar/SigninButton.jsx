import LoginModal from '../auth/LoginModal'
import SignupModal from '../auth/SignupModal'
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {PersonFill} from 'react-bootstrap-icons'

export const SigninButton = () => {
    const [show, setShow] = useState(null);

    return (
        <>
            <Modal show={show!==null} onHide={()=>setShow(null)} size="md"  >
            {
                show==='login' ? 
                    <LoginModal setShow={setShow} /> 
                    : 
                    <SignupModal setShow={setShow} />
            }

            </Modal>
            <Button
                variant="primary"
                className="px-4 py-2"
                onClick={()=>setShow('login')}
            >
                <PersonFill size={25} className="me-1" />
                <span className="fs-5">Sign in</span>
            </Button>
        </>
    )
}