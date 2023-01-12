import { useState } from 'react';
import cx from 'classnames';
import CardWrapper from '../../../../design-system/component/CardWrapper/CardWrapper';
import style from './../Auth.module.css';
import logo from '../../../../logo.svg';
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
                <img onClick={()=>{navigate('/')}} src={logo} alt="logo"></img>
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

                    <button onClick={()=>{navigate('/signup')}} className={style.signUpButton}>
                        or, sign up?
                    </button>
                </div>
            </form>
        </div>
    );
}
