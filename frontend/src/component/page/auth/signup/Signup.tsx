import { useState } from 'react';
import CardWrapper from '../../../../design-system/component/CardWrapper/CardWrapper';
import style from './../Auth.module.css';
import logo from '../../../../design-system/icon/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // Introdution de useNavigate
    const navigate = useNavigate();
    // naviguer vers la Signup page
    // const handleNavigation = () => {
    //     navigate('/signup');
    // };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log(password);
    console.log(username);

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
                    <h4>Sign Up</h4>
                </div>
                <label className={style.loginLabel} htmlFor="userName">
                    Username
                </label>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
                />

                <label className={style.loginLabel} htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Email"
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
                        Confirm
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                        }}
                        className={style.signUpButton}
                    >
                        already registered?
                    </button>
                </div>
            </form>
        </div>
    );
}
