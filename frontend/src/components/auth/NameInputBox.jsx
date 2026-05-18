import {FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";

const NameInputBox = ({name, setName, nameError, setNameError}) => {
    console.log('in nameinput ')
    const handleChange = e =>{
        setName(e.target.value)
        if(nameError)
            validateName(e.target.value)
    }
    const validateName = (name) =>{

        const re = /^[a-zA-Z0-9.-_]{2,20}$/

        if(name === "")
            setNameError("Name is required")
        else if(!re.test(name))
            setNameError("Name must be between 2 and 20 letters and contain only alphanumeric characters and ._-")
        else
            setNameError("")
    }
    return (
        <>
            <Form.Control type="text" 
                          placeholder="Name" 
                          value={name}
                          onChange={handleChange}
                          onBlur={e=>validateName(e.target.value)}
            />
            {nameError && <p className="text-danger">{nameError}.</p>}
        </>
    )
}
export default NameInputBox