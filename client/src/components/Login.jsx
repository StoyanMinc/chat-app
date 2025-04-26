export default function Login() {
    return( 
        <div className="form-container">
        <h1>Login</h1>
        <form action="" method="POST">
            <div className="input-holder">
                <input type="text" name="email" id="email" required />
                <span></span>
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-holder">
                <input type="password" name="password" id="password" required />
                <span></span>
                <label htmlFor="password">Password</label>
            </div>
            <button>Login</button>
            <div className="signup_link">
                Not a Member ? <a href="signup.php">Signup</a>
            </div>
        </form>
    </div>
    )
}