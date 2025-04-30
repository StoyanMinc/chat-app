import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showRePass, setShowRepass] = useState(false);

    const validate = () => {
        if (!formData.email) {
            toast.error('Email is!');
            return false
        };
        if (!formData.username) {
            toast.error('Username is!');
            return false
        }

        if (!formData.password) {
            toast.error('Password is!');
            return false
        }

        if (formData.password !== formData.repass) {
            toast.error("Passwords don/'t match!")
            return false
        }

        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await register(formData.email, formData.username, formData.password);
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

        if (value !== "") {
            e.target.classList.add("filled");
        } else {
            e.target.classList.remove("filled");
        }
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
                    {showPassword
                        ? <div className="show-eye" onClick={() => setShowPassword(prevState => !prevState)}></div>
                        : <div className="hide-eye" onClick={() => setShowPassword(prevState => !prevState)}></div>
                    }
                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" onChange={changeHander} />
                    <span></span>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-holder">
                    {showRePass
                        ? <div className="show-eye" onClick={() => setShowRepass(prevState => !prevState)}></div>
                        : <div className="hide-eye" onClick={() => setShowRepass(prevState => !prevState)}></div>
                    }
                    <input type={showRePass ? 'text' : 'password'} name="repass" id="repass" onChange={changeHander} />
                    <span></span>
                    <label htmlFor="repass">Repeat password</label>
                </div>
                <button>Register</button>
                <div className="signup_link">
                    You are alredy registered ? <Link to={'/login'}>Login now</Link>
                </div>
            </form>
        </div>
    )
}