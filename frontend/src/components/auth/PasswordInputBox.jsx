import {Form, InputGroup} from "react-bootstrap";
import {useState} from "react";
import {Eye, EyeSlash} from "react-bootstrap-icons";
import PropTypes from 'prop-types';

const PasswordInputBox = ({password, setPassword, passwordError, setPasswordError}) => {

    const [showPassword, toggleShowPassword] = useState(false)

    const handleChange = (e) => {
        setPassword(e.target.value)
        if(passwordError)
            validatePassword(e.target.value)
    }
    const validatePassword = (pa) =>{

        const re = /^[A-Za-z0-9]{6,20}$/
        if(pa === "")
            setPasswordError("Password is required")
        else if(!re.test(pa)) {
            setPasswordError("Password must be 6-20 characters long, include only alphanumeric.")
        }
        else
            setPasswordError("")

    }
    return (
        <>
        
        <div style={{ position: 'relative'}}>
            
                <Form.Control type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              maxLength={20}
                              value={password}
                              onChange={handleChange}
                              onBlur={e=>validatePassword(e.target.value)}
                />
                <InputGroup.Text 
                    style={{ cursor: 'pointer', 
                        position: 'absolute', 
                        right: 0, top: 0, height: '100%', aspectRatio: "1/1",
                    display: 'flex',  alignItems: "center",
    justifyContent: "center"}}
                    onClick={()=>toggleShowPassword(!showPassword)}

                >
                    {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>

        </div>

            {passwordError && <p className="text-danger">{passwordError}.</p>}
        </>

    )
}
PasswordInputBox.propTypes = {
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    setPasswordError: PropTypes.func.isRequired,
};
export default PasswordInputBox