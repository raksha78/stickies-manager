import { useState } from "react";
import './Login.css';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        if (username) {
            onLogin(username);
        }
    }

    function onChange(e) {
        setUsername(e.target.value);
    }

    return (
        <div className="main-layout">
            <form onSubmit={onSubmit} action="#/login" className="login-form">
                <label className="login-form__label">
                    <span className="login-form__label-text">Username: </span>
                    <input value={username} onChange={onChange} className="login-form__input"></input>
                </label>
                <button type="submit" className="login-form__button">Login</button>
            </form>

        </div>
    )
}

export default LoginForm;