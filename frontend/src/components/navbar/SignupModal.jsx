import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const SignupModal = ({setShow}) => {

    return(
        <Form style={{ width: '100%'}} 
        // onSubmit={handleSubmit}
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
                // type="submit" disabled={ emailError!=="" || passwordError!=="" || email==="" || password==="" }
                >
                    Register
                </Button>
                
                
            
            </Modal.Footer>
        </Form>
    )
}
export default SignupModal;