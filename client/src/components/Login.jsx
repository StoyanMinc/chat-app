import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const login = useLogin();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="input-holder">
                    <input type="text" name="username" id="username" onChange={changeHandler} placeholder="Jon Doe" />
                    <span></span>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-holder">
                    <input type="password" name="password" id="password" onChange={changeHandler} placeholder="************" />
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