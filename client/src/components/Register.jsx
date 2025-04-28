import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useRegister } from "../hooks/useAuth"

export default function Register() {

    const navigate = useNavigate();
    const register = useRegister();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        repass: ''
    });

    const validate = () => {
        if (!formData.email) {
            return toast.error('Email is required!');
        };
        if (!formData.username) {
            return toast.error('Username is required!');
        }

        if (!formData.password) {
            return toast.error('Password is required!');
        }

        if (formData.password !== formData.repass) {
            return toast.error("Passwords don/'t match!")
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        validate();

        try {
            const result = await register(formData.email, formData.username, formData.password);
            console.log(result);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const changeHander = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    return (
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div className="input-holder">
                    <input type="text" name="email" id="email" onChange={changeHander} />
                    <span></span>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-holder">
                    <input type="text" name="username" id="username" onChange={changeHander} />
                    <span></span>
                    <label htmlFor="username">Full name</label>
                </div>
                <div className="input-holder">
                    <input type="password" name="password" id="password" onChange={changeHander} />
                    <span></span>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-holder">
                    <input type="password" name="repass" id="repass" onChange={changeHander} />
                    <span></span>
                    <label htmlFor="repass">Repeat password</label>
                </div>
                <button>Register</button>
                <div className="signup_link">
                    Not a Member ? <a href="signup.php">Signup</a>
                </div>
            </form>
        </div>
    )
}