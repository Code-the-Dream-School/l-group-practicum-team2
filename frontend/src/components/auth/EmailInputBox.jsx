import { Form } from "react-bootstrap";
import {useState} from "react";

const EmailInputBox = ({email, setEmail, emailError, setEmailError}) => {


    const handleChange = e =>{
        setEmail(e.target.value)
        if(emailError)
            validateEmail(e.target.value)
    }
    const validateEmail = (email) =>{
        console.log("validate email: " + email )

        const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

        if(email === "")
            setEmailError("Email is required")
        else if(!re.test(email))
            setEmailError("Email format is invalid")

        else
            setEmailError("")


    }
    return (
        <>
            
            <Form.Control   
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                onBlur={e=>validateEmail(e.target.value)}
            />
            
            {emailError && <p className="text-danger">{emailError}.</p>}
        </>

)
}
export default EmailInputBox