import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NameInputBox from './NameInputBox';

const SignupModal = ({setShow}) => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(name);
    }
    return(
        <Form style={{ width: '100%'}} 
        onSubmit={handleSubmit}
        >
            <Modal.Header closeButton>
                <Modal.Title>Sign in to your account</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='my-3'>
                    <Form.Label ><b>Email</b></Form.Label>
                </div>   
                <div className='my-3'>
                    <Form.Label><b>Name</b></Form.Label>
                    <NameInputBox name={name} setName={setName} nameError={nameError} setNameError={setNameError} />
                </div>

                <div className='my-3'>
                    <Form.Label><b>Password</b></Form.Label>
                </div>
                 
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
                <div>
                    Already have an account? 
           
                        <Link className='ms-1' onClick={()=>setShow('login')} >
                        login 
                    </Link>

                </div>
            
                <Button 
                disabled={ nameError!=="" || name===""  }
                >
                    Register
                </Button>
                
                
            
            </Modal.Footer>
        </Form>
    )
}
export default SignupModal;