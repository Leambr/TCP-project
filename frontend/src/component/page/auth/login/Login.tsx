import { useState, useEffect } from 'react';
import style from './../Auth.module.css';
import logo from '../../../../design-system/icon/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Login() {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  onHandleLogin = async (e: any) =>
    {
        e.preventDefault();
        
        await fetch('http://localhost/api/user/logIn', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/landing'); 
            })
            .catch((err) => {
                console.log(err.message);
            });

    };

    // Introdution de useNavigate
    const navigate = useNavigate();

    return (
        <div className={style.loginCard}>
            <div className={style.loginLogo}>
                <img
                    onClick={() => {
                        navigate('/');
                    }}
                    src={logo}
                    alt="logo"
                ></img>
            </div>

            <form className={style.loginForm} onSubmit={onHandleLogin}>
                <div>
                    <h4>Login</h4>
                </div>
                <label className={style.loginLabel} htmlFor="email">
                    email
                </label>
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email"
                />
                <label className={style.loginLabel} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
                <div className={style.formButton}>
                    <button type="submit" className={style.loginButton}>
                        Login
                    </button>

                    <button
                        onClick={() => {
                            navigate('/signup');
                        }}
                        className={style.signUpButton}
                    >
                        or, sign up?
                    </button>
                </div>
            </form>
        </div>
    );
}
