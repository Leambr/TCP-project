import { useState, useEffect } from 'react';
import cx from 'classnames';
import CardWrapper from '../../../../design-system/component/CardWrapper/CardWrapper';
import style from './../Auth.module.css';
import logo from '../../../../design-system/icon/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log(password);
    console.log(username);

    // const verifyAuth = async (userName: string, password: string) => {
    //     await fetch('url', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             user: userName,
    //             password: password,
    //             userId: Math.random().toString(36).slice(2),
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setUser((user: any) => [data, ...user]);
    //             setUsername('');
    //             setPassword('');
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // };

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

            <form className={style.loginForm} action="">
                <div>
                    <h4>Login</h4>
                </div>
                <label className={style.loginLabel} htmlFor="userName">
                    Username
                </label>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
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
