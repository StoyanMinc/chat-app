import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { getAuthContext } from "../context/UserContext";

export default function Login() {
    const { socket } = getAuthContext();
    const navigate = useNavigate();
    const login = useLogin();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        if (!formData.email) {
            toast.error('Email is required!')
            return false;
        }

        if (!formData.password) {
            toast.error('Password is required! !');
            return false;
        }
        return true;
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const result = await login(formData.email, formData.password);
            navigate('/');
            toast.success('Successfully Login!');
            // socket.emit('user_is_login', (result._id));
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))

        if (value !== "") {
            e.target.classList.add("filled");
        } else {
            e.target.classList.remove("filled");
        }
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="input-holder">
                    <input type="text" name="email" id="email" onChange={changeHandler} />
                    <span></span>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-holder">
                    {showPassword
                        ? <div className="show-eye" onClick={() => setShowPassword(prevState => !prevState)}></div>
                        : <div className="hide-eye" onClick={() => setShowPassword(prevState => !prevState)}></div>
                    }

                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" onChange={changeHandler} />
                    <span></span>
                    <label htmlFor="password">Password</label>
                </div>
                <button>Login</button>
                <div className="signup_link">
                    Not a Member ? <Link to={'/register'}>Register now</Link>
                </div>
            </form>
        </div>
    )
}